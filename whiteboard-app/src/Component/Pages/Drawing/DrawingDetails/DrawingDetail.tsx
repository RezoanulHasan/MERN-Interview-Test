/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import useTitle from "../../../Hooks/useTitle";
import { fetchDrawingById } from "../../../api";
import { useParams } from "react-router-dom";
import Spinner from "../../../Shared/Spinner/Spinner";
import Canvas from "./Canvas";
import { DrawingElement } from "../../../Hooks/type";

interface Drawing {
  title: string;
  description: string;
  elements: DrawingElement[];
}

const DrawingDetail: React.FC = () => {
  useTitle("Details Page");
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
        <Spinner></Spinner>
      )}
    </div>
  );
};

export default DrawingDetail;
