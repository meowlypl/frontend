export type AnimalStatus =
  | "Do adopcji"
  | "W trakcie leczenia"
  | "Zarezerwowany"
  | "Adoptowany";

export type AnimalGender = "Samica" | "Samiec" | "Nieznana";

export interface Animal {
  id: string;
  name: string;
  species: string;
  gender: AnimalGender;
  age: string;
  status: AnimalStatus;
  description: string;
  imageUrl: string;
  createdAt: string;
}