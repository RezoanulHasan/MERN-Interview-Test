/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import useTitle from "../../../Hooks/useTitle";
import { fetchDrawingById } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../Shared/Spinner/Spinner";
import Canvas from "./Canvas";
import { DrawingElement } from "../../../Hooks/type";
import { FaArrowLeft } from "react-icons/fa";

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
        setDrawing(response.data.data);
      })
      .catch((error) => console.error("Error fetching drawing:", error));
  }, [id]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center mb-5">
        {drawing ? (
          <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Title : {drawing?.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {" "}
              Description: {drawing?.description}
            </p>
            <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
              <Canvas elements={drawing?.elements} />
            </div>
            <div className="card-actions justify-center">
              <button
                className="btn mt-5 btn-outline btn-info"
                onClick={handleBack}
              >
                <FaArrowLeft className="text-xl" />
                Go Back
              </button>
            </div>{" "}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default DrawingDetail;
