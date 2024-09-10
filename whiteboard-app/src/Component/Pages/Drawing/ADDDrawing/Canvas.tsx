/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { saveDrawing } from "../../../api";
import { DrawingElement } from "../../../Hooks/type";

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
  const [mode, setMode] = useState<"line" | "shape" | "text" | "eraser">(
    "line"
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [textCoords, setTextCoords] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    drawElements();
  }, [elements, currentText, textCoords, mode]);

  const drawElements = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        elements.forEach((element) => {
          if (element.type === "line") {
            drawLine(ctx, element.coordinates);
          } else if (element.type === "shape") {
            drawShape(ctx, element.coordinates);
          } else if (element.type === "text") {
            drawText(ctx, element.coordinates, element.text || "");
          }
        });

        if (mode === "text" && currentText && textCoords) {
          ctx.font = "16px Arial";
          ctx.fillStyle = "gray";
          ctx.fillText(currentText, textCoords.x, textCoords.y);
        }
      }
    }
  };

  const drawLine = (ctx: CanvasRenderingContext2D, coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawShape = (ctx: CanvasRenderingContext2D, coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;
    ctx.beginPath();
    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawText = (
    ctx: CanvasRenderingContext2D,
    coordinates: number[],
    text: string
  ) => {
    const [x, y] = coordinates;
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, x, y);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (mode === "text") {
      setTextCoords({ x: offsetX, y: offsetY });
    } else if (mode === "eraser") {
      eraseElement(offsetX, offsetY);
    } else {
      setStartCoords({ x: offsetX, y: offsetY });
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startCoords) return;
    const { offsetX, offsetY } = event.nativeEvent;
    drawElements(); // Clear and redraw existing elements

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (mode === "line" && startCoords) {
          drawLine(ctx, [startCoords.x, startCoords.y, offsetX, offsetY]);
        } else if (mode === "shape" && startCoords) {
          const width = offsetX - startCoords.x;
          const height = offsetY - startCoords.y;
          drawShape(ctx, [
            startCoords.x,
            startCoords.y,
            startCoords.x + width,
            startCoords.y + height,
          ]);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (startCoords && mode !== "eraser") {
      const canvas = canvasRef.current;
      if (canvas) {
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
        }

        if (newElement) {
          const updatedElements = [...elements, newElement];
          onSave(updatedElements);
        }
      }
    }
    setIsDrawing(false);
    setStartCoords(null);
  };

  const handleTextSubmit = () => {
    if (currentText && textCoords) {
      const newTextElement: DrawingElement = {
        type: "text",
        coordinates: [textCoords.x, textCoords.y],
        text: currentText,
      };

      const updatedElements = [...elements, newTextElement];
      onSave(updatedElements);
      setCurrentText("");
      setTextCoords(null);
    }
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
      await saveDrawing({ title, description, elements });

      Swal.fire({
        title: "Success!",
        text: "Drawing saved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      onSave([]);
      onTitleChange("");
      onDescriptionChange("");
    } catch (error) {
      console.error("Error saving drawing:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save the drawing. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const eraseElement = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
        if (index >= 0 && index < data.length) {
          data[index] = 255; // Red
          data[index + 1] = 255; // Green
          data[index + 2] = 255; // Blue
          data[index + 3] = 255; // Alpha
          ctx.putImageData(imageData, 0, 0);
        }
      }
    }
  };

  const handleResetClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onSave([]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-20 p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode("line")}
          aria-label="Draw Line"
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "line" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Line
        </button>
        <button
          onClick={() => setMode("shape")}
          aria-label="Draw Shape"
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "shape" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Shape
        </button>
        <button
          onClick={() => setMode("text")}
          aria-label="Add Text"
          className={`px-4 py-2 rounded-lg text-white ${
            mode === "text" ? "bg-blue-600" : "bg-gray-300"
          } transition-all`}
        >
          Text
        </button>

        <button
          onClick={handleResetClick}
          aria-label="Reset Canvas"
          className="px-4 py-2 rounded-lg bg-red-600 text-white transition-all"
        >
          Reset
        </button>
      </div>
      {mode === "text" && (
        <div className="mb-4">
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="Enter text here"
            className="border border-gray-400 p-2 rounded-lg"
          />
          <button
            onClick={handleTextSubmit}
            aria-label="Add Text"
            className="mx-4 px-6 py-2 btn text-white rounded-lg btn-outline btn-info transition-all"
          >
            Add Text
          </button>
        </div>
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
        aria-label="Save Drawing"
        className="px-6 py-2 btn text-white rounded-lg btn-outline btn-info transition-all"
      >
        Save Drawing
      </button>
    </div>
  );
};

export default Canvas;
