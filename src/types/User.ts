export type UserRole =
  | "user"
  | "foundation"
  | "admin";

export interface User {
  id: number;

  name: string;

  email: string;

  role: "user" | "foundation";

  avatar?: string;

  xp: number;

  level: number;

  completedMissions: number;

  reports: number;

  badges: number;

  streak: number;

  verified: boolean;

  city?: string;

  bio?: string;

  createdAt?: string;

  updatedAt?: string;
}