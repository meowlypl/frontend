import type { MarkerType } from "./Marker";

export type MissionDifficulty = "easy" | "medium" | "hard";

export interface Mission {
  id: number;

  title: string;

  description: string;

  difficulty: MissionDifficulty;

  xp: number;

  type?: MarkerType;

  lat?: number;

  lng?: number;

  address?: string;

  image?: string;

  completed?: boolean;

  active?: boolean;

  createdBy?: number;

  createdAt?: string;

  updatedAt?: string;
}