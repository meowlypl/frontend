export type MarkerType =
  | "foundation"
  | "mission"
  | "feeding"
  | "cat_house"
  | "vet"
  | "adoption"
  | "report"
  | "event";

export interface Marker {
  id: number;

  title: string;

  description: string;

  type: MarkerType;

  lat: number;

  lng: number;

  address: string;

  image?: string;

  xp?: number;

  active?: boolean;

  createdAt?: string;

  updatedAt?: string;
}