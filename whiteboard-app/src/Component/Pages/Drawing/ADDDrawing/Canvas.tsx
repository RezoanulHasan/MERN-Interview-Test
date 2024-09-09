/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { saveDrawing } from "../../../api";

interface DrawingElement {
  type: "line" | "shape" | "text";
  coordinates: number[];
  text?: string;
}

interface Props {
  elements: DrawingElement[];
  onSave: (elements: DrawingElement[]) => void;
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const Canvas: React.FC<Props> = ({
  elements,
  onSave,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<"line" | "shape" | "text">("line");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentText, setCurrentText] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        elements?.forEach((element) => {
          if (element.type === "line") {
            const [x1, y1, x2, y2] = element.coordinates;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
          } else if (element.type === "shape") {
            const [x1, y1, x2, y2] = element.coordinates;
            ctx.beginPath();
            ctx.rect(x1, y1, x2 - x1, y2 - y1);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
          } else if (element.type === "text") {
            const [x, y] = element.coordinates;
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(element.text || "", x, y);
          }
        });
      }
    }
  }, [elements]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setStartCoords({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startCoords) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => {
      if (element.type === "line") {
        const [x1, y1, x2, y2] = element.coordinates;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (element.type === "shape") {
        const [x1, y1, x2, y2] = element.coordinates;
        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (element.type === "text") {
        const [x, y] = element.coordinates;
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(element.text || "", x, y);
      }
    });

    if (mode === "line" && startCoords) {
      ctx.beginPath();
      ctx.moveTo(startCoords.x, startCoords.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (mode === "shape" && startCoords) {
      const width = offsetX - startCoords.x;
      const height = offsetY - startCoords.y;
      ctx.beginPath();
      ctx.rect(startCoords.x, startCoords.y, width, height);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    if (startCoords) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { x: startX, y: startY } = startCoords;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      let newElement: DrawingElement | undefined;
      if (mode === "line") {
        newElement = {
          type: "line",
          coordinates: [startX, startY, canvasWidth / 2, canvasHeight / 2],
        };
      } else if (mode === "shape") {
        newElement = {
          type: "shape",
          coordinates: [startX, startY, canvasWidth / 2, canvasHeight / 2],
        };
      } else if (mode === "text" && currentText) {
        newElement = {
          type: "text",
          coordinates: [startX, startY],
          text: currentText,
        };
      }

      if (newElement) {
        const updatedElements = [...elements, newElement];
        onSave(updatedElements);
      }
    }
    setIsDrawing(false);
    setStartCoords(null);
  };

  const handleSaveClick = async () => {
    if (!title || !description || elements.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in the title, description, and add at least one drawing element.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await saveDrawing({
        title,
        description,
        elements,
      });

      Swal.fire({
        title: "Success!",
        text: "Drawing saved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the canvas and reset fields
      onSave([]);
      onTitleChange("");
      onDescriptionChange("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save the drawing. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mb-20 p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode("line")}
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "line" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Line
        </button>
        <button
          onClick={() => setMode("shape")}
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "shape" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Shape
        </button>
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "text" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Text
        </button>
      </div>
      {mode === "text" && (
        <input
          type="text"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Enter text"
          className="p-2 border border-gray-400 rounded-lg mb-4"
        />
      )}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-400 bg-white mb-4 w-full max-w-4xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button
        onClick={handleSaveClick}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
      >
        Save Drawing
      </button>
    </div>
  );
};

export default Canvas;
