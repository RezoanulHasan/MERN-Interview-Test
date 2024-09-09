/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/AllDrawings.tsx
import React, { useState, useEffect } from "react";
import { fetchAllDrawings } from "../../api";
import DrawingList from "../DrawingList";

const AllDrawings: React.FC = () => {
  const [drawings, setDrawings] = useState<any[]>([]);

  useEffect(() => {
    fetchAllDrawings()
      .then((response) => setDrawings(response.data.data))
      .catch((error) => console.error("Error fetching drawings:", error));
  }, []);

  return <DrawingList drawings={drawings} />;
};

export default AllDrawings;
