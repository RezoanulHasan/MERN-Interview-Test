import React, { useState } from "react";
import Canvas from "./Canvas";
import { DrawingElement } from "../../../Hooks/type";

const AddDrawing: React.FC = () => {
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Whiteboard</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter drawing title"
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter drawing description"
          className="p-2 border rounded w-full sm:w-1/2"
        />
      </div>
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
