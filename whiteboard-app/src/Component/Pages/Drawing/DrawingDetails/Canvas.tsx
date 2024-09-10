import React, { useRef, useEffect } from "react";
import { DrawingElement } from "../../../Hooks/type";

interface Props {
  elements: DrawingElement[];
}

const Canvas: React.FC<Props> = ({ elements }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through each element and draw it
        elements?.forEach((element) => {
          if (element.type === "line") {
            const [x1, y1, x2, y2] = element.coordinates;
            ctx.beginPath();
            ctx.moveTo(x1, y1); // Move to the starting point
            ctx.lineTo(x2, y2); // Draw line to the end point
            ctx.strokeStyle = "black"; // Set line color (optional)
            ctx.lineWidth = 2; // Set line width (optional)
            ctx.stroke(); // Render the line
          } else if (element.type === "shape") {
            const [x1, y1, x2, y2] = element.coordinates;
            ctx.beginPath();
            ctx.rect(x1, y1, x2 - x1, y2 - y1); // Draw the rectangle or square
            ctx.strokeStyle = "black"; // Set shape outline color
            ctx.lineWidth = 2; // Set outline width
            ctx.stroke(); // Render the shape
          } else if (element.type === "text") {
            const [x, y] = element.coordinates;
            ctx.font = "16px Arial"; // Set font size and style
            ctx.fillStyle = "black"; // Set text color
            ctx.fillText(element.text || "", x, y); // Render the text
          }
        });
      }
    }
  }, [elements]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;
