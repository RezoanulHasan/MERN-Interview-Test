import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Drawing } from "../../Hooks/type";

import { FaArrowRight } from "react-icons/fa6";

interface Props {
  drawings: Drawing[];
  onDelete: (id: string) => void;
}

const DrawingList: React.FC<Props> = ({ drawings, onDelete }) => {
  const handleDeleteClick = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "Your drawing has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Drawings</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drawings?.map((drawing) => (
          <li
            key={drawing._id}
            className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            {" "}
            <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
              Title : {drawing.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">
              Description: {drawing.description}
            </p>
            <div className="card-actions justify-end">
              <Link
                to={`/drawings/${drawing._id}`}
                className="mt-4 inline-flex items-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 text-sm"
              >
                <span className="mr-2">Details</span>{" "}
                <FaArrowRight className="text-xl" />
              </Link>
              <button
                onClick={() => handleDeleteClick(drawing._id)}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-end"
                title="Delete drawing"
              >
                <span className="mr-2">Delete</span> 🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrawingList;
