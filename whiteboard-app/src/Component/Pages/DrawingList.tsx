// src/components/DrawingList.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Drawing {
  _id: string;
  title: string;
  description: string;
}

interface Props {
  drawings: Drawing[];
}

const DrawingList: React.FC<Props> = ({ drawings }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Drawings</h1>
      <ul>
        {drawings.map((drawing) => (
          <li key={drawing._id} className="mb-4 p-4 border rounded-md bg-white">
            <Link to={`/drawings/${drawing._id}`}>
              <h2 className="text-xl font-semibold">{drawing.title}</h2>
              <p>{drawing.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrawingList;
