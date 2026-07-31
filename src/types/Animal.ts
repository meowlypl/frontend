export type AnimalGender = "Samica" | "Samiec" | "Nieznana";

export type AnimalStatus =
  | "Do adopcji"
  | "W trakcie leczenia"
  | "Zarezerwowany"
  | "Adoptowany";

export type AnimalMediaType = "image" | "video";

export interface AnimalMedia {
  id: string;
  type: AnimalMediaType;
  name: string;
  blob: Blob;
}

export interface Animal {
  id: string;
  foundationId: string;
  name: string;
  breed: string;
  gender: AnimalGender;
  age: string;
  status: AnimalStatus;
  description: string;
  healthInformation: string;
  requirements: string;
  media: AnimalMedia[];
  createdAt: string;
  updatedAt: string;
}

export type AnimalFormData = Omit<
  Animal,
  "id" | "foundationId" | "createdAt" | "updatedAt"
>;