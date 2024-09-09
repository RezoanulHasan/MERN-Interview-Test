import React from "react";
import { useParams } from "react-router-dom";

import { fetchDrawingById } from "../api";
import Canvas from "./Home/Canvas";

interface DrawingElement {
  type: "line" | "shape" | "text";
  coordinates: number[];
  text?: string;
}

interface Drawing {
  title: string;
  description: string;
  elements: DrawingElement[];
}

const DrawingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drawing, setDrawing] = React.useState<Drawing | null>(null);

  React.useEffect(() => {
    fetchDrawingById(id as string)
      .then((response) => {
        setDrawing(response.data.data); // Make sure to set the correct data from response
      })
      .catch((error) => console.error("Error fetching drawing:", error));
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {drawing ? (
        <div>
          <h1 className="text-2xl font-bold">{drawing?.title}</h1>
          <p>{drawing?.description}</p>
          <Canvas elements={drawing?.elements} />{" "}
          {/* Passing elements to Canvas */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DrawingDetail;
