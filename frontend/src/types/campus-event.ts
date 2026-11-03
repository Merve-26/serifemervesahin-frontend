
export type Category =
  | "Seminer"
  | "Atölye"
  | "Söyleşi"
  | "Yarışma"
  | "Konser"
  | "Spor";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  image?: string;
}
