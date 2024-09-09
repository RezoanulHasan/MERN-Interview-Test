/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { DrawingElement } from "./Hooks/type";

const API_URL = "https://whiteboard-app-psi.vercel.app/api/drawings";

export const fetchAllDrawings = () => axios.get(API_URL);
export const fetchDrawingById = (id: string) => axios.get(`${API_URL}/${id}`);

export const deleteDrawingById = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const saveDrawing = async (drawing: {
  title: string;
  description: string;
  elements: DrawingElement[];
}) => {
  try {
    const response = await axios.post(API_URL, drawing);
    return response.data;
  } catch (error) {
    throw new Error("Error saving drawing");
  }
};
