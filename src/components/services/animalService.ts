import type { Animal } from "../../types/Animal";

const STORAGE_KEY = "foundationAnimals";

function readAnimals(): Animal[] {
  try {
    const storedAnimals = localStorage.getItem(STORAGE_KEY);

    if (!storedAnimals) {
      return [];
    }

    const parsedAnimals: unknown = JSON.parse(storedAnimals);

    return Array.isArray(parsedAnimals) ? (parsedAnimals as Animal[]) : [];
  } catch {
    return [];
  }
}

function saveAnimals(animals: Animal[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
}

export const animalService = {
  getAll(): Animal[] {
    return readAnimals();
  },

  create(animal: Omit<Animal, "id" | "createdAt">): Animal {
    const animals = readAnimals();

    const newAnimal: Animal = {
      ...animal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    saveAnimals([newAnimal, ...animals]);

    return newAnimal;
  },

  update(id: string, changes: Partial<Animal>): Animal | null {
    const animals = readAnimals();
    const animalIndex = animals.findIndex((animal) => animal.id === id);

    if (animalIndex === -1) {
      return null;
    }

    const updatedAnimal = {
      ...animals[animalIndex],
      ...changes,
      id,
    };

    animals[animalIndex] = updatedAnimal;
    saveAnimals(animals);

    return updatedAnimal;
  },

  delete(id: string): void {
    const animals = readAnimals();
    saveAnimals(animals.filter((animal) => animal.id !== id));
  },
};