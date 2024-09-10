import React, { useState } from "react";
import Canvas from "./Canvas";
import { DrawingElement } from "../../../Hooks/type";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const AddDrawing: React.FC = () => {
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-lg mb-5">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600 ">
        Welcome to
        <img
          className="inline-block ml-2 w-20 h-20 border-4 border-blue-600 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          rel="icon"
          src="/whiteboard.png"
          alt="WhiteBoard Icon"
        />
        <span className="ml-2 text-blue-800 ">WhiteBoard</span>
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Draw lines, shapes, and add text annotations on the whiteboard. Enhance
        your creativity and collaboration by sketching out your ideas in
        real-time, with tools for every use case.
      </p>
      <div className="card-actions justify-center">
        <Link
          to="/drawings"
          className="mt-4 text-2xl inline-flex items-center py-3 px-6 mb-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transform transition-transform duration-300 ease-in-out"
        >
          <span className="mr-2">See All Drawings</span>
          <FaArrowRight className="text-xl" />
        </Link>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Add Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter drawing title"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Add Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter drawing description"
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
          />
        </div>
      </div>
      <label className="block  text-2xl font-semibold text-gray-700 mt-2 mb-6 text-center">
        Draw lines, shapes, and add Text annotations
      </label>
      <Canvas
        elements={elements}
        onSave={setElements}
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />
    </div>
  );
};

export default AddDrawing;
