export interface DrawingElement {
  type: "line" | "shape" | "text";
  coordinates: number[];
  text?: string;
}
export interface Drawing {
  _id: string;
  title: string;
  description: string;
}
