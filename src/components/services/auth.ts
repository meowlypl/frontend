import { api } from "./api";
import type { User } from "../../types/User";

const STORAGE_KEY = "meowlyUser";

export async function login(email: string, password: string): Promise<User> {
  const data = await api.post("/login", {
    email,
    password,
  });

  if (!data.success) {
    throw new Error(data.message || "Nie udało się zalogować.");
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));

  return data.user;
}

export async function register(user: {
  name: string;
  email: string;
  password: string;
  role: "user" | "foundation";
}) {
  const data = await api.post("/register", user);

  if (!data.success) {
    throw new Error(data.message || "Nie udało się utworzyć konta.");
  }

  return data;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(STORAGE_KEY);

  if (!user) return null;

  return JSON.parse(user);
}

export function saveCurrentUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(STORAGE_KEY);
}

export function isFoundation(): boolean {
  const user = getCurrentUser();

  return user?.role === "foundation";
}

export function isAdmin(): boolean {
  const user = getCurrentUser();

  if (!user) return false;

  // Administrator aplikacji
  return user.email === "maja.wronowska@interia.pl";
}