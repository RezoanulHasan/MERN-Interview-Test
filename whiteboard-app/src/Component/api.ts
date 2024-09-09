// src/api.ts
import axios from "axios";

const API_URL = "https://whiteboard-app-psi.vercel.app/api/drawings";

export const fetchAllDrawings = () => axios.get(API_URL);
export const fetchDrawingById = (id: string) => axios.get(`${API_URL}/${id}`);
