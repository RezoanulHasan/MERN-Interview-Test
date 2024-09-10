/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchAllDrawings, deleteDrawingById } from "../../api"; // Assuming you have a delete API function
import DrawingList from "./DrawingList";
import { Drawing } from "../../Hooks/type";
import Spinner from "../../Shared/Spinner/Spinner";

const AllDrawings: React.FC = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllDrawings()
      .then((response) => {
        setDrawings(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching drawings");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    deleteDrawingById(id)
      .then(() => {
        setDrawings((prevDrawings) =>
          prevDrawings.filter((drawing) => drawing._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting drawing:", error);
      });
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return drawings.length > 0 ? (
    <DrawingList drawings={drawings} onDelete={handleDelete} />
  ) : (
    <p className="text-red-500 text-xl font-semibold  mt-20">
      No drawings available.
    </p>
  );
};

export default AllDrawings;
