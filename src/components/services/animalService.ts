import type {
  Animal,
  AnimalFormData,
} from "../../types/Animal";

const DATABASE_NAME = "meowlyDatabase";
const DATABASE_VERSION = 1;
const STORE_NAME = "animals";

function getFoundationId(): string {
  const savedFoundation = localStorage.getItem("foundationUser");

  if (!savedFoundation) {
    throw new Error("Fundacja nie jest zalogowana.");
  }

  try {
    const foundation = JSON.parse(savedFoundation) as {
      id?: string;
    };

    if (!foundation.id) {
      throw new Error("Brak identyfikatora fundacji.");
    }

    return foundation.id;
  } catch {
    throw new Error("Nie udało się odczytać danych fundacji.");
  }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(
      DATABASE_NAME,
      DATABASE_VERSION,
    );

    request.onerror = () => {
      reject(
        request.error ??
          new Error("Nie udało się otworzyć bazy danych."),
      );
    };

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });

        store.createIndex(
          "foundationId",
          "foundationId",
          {
            unique: false,
          },
        );
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

export const animalService = {
  async getAll(): Promise<Animal[]> {
    const database = await openDatabase();
    const foundationId = getFoundationId();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(
        STORE_NAME,
        "readonly",
      );

      const store = transaction.objectStore(STORE_NAME);
      const index = store.index("foundationId");
      const request = index.getAll(foundationId);

      request.onerror = () => {
        reject(
          request.error ??
            new Error("Nie udało się pobrać zwierząt."),
        );
      };

      request.onsuccess = () => {
        const animals = request.result as Animal[];

        animals.sort(
          (firstAnimal, secondAnimal) =>
            new Date(secondAnimal.createdAt).getTime() -
            new Date(firstAnimal.createdAt).getTime(),
        );

        resolve(animals);
      };

      transaction.oncomplete = () => {
        database.close();
      };
    });
  },

  async create(data: AnimalFormData): Promise<Animal> {
    const database = await openDatabase();
    const date = new Date().toISOString();

    const animal: Animal = {
      ...data,
      id: crypto.randomUUID(),
      foundationId: getFoundationId(),
      createdAt: date,
      updatedAt: date,
    };

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(
        STORE_NAME,
        "readwrite",
      );

      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(animal);

      request.onerror = () => {
        reject(
          request.error ??
            new Error("Nie udało się dodać zwierzęcia."),
        );
      };

      transaction.oncomplete = () => {
        database.close();
        resolve(animal);
      };

      transaction.onerror = () => {
        database.close();
        reject(
          transaction.error ??
            new Error("Nie udało się zapisać zwierzęcia."),
        );
      };
    });
  },

  async update(
    id: string,
    data: AnimalFormData,
  ): Promise<Animal | null> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(
        STORE_NAME,
        "readwrite",
      );

      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(id);

      getRequest.onerror = () => {
        reject(
          getRequest.error ??
            new Error("Nie udało się pobrać zwierzęcia."),
        );
      };

      getRequest.onsuccess = () => {
        const existingAnimal = getRequest.result as
          | Animal
          | undefined;

        if (!existingAnimal) {
          resolve(null);
          return;
        }

        if (
          existingAnimal.foundationId !== getFoundationId()
        ) {
          reject(
            new Error(
              "Nie możesz edytować zwierzęcia innej fundacji.",
            ),
          );
          return;
        }

        const updatedAnimal: Animal = {
          ...existingAnimal,
          ...data,
          id: existingAnimal.id,
          foundationId: existingAnimal.foundationId,
          createdAt: existingAnimal.createdAt,
          updatedAt: new Date().toISOString(),
        };

        store.put(updatedAnimal);

        transaction.oncomplete = () => {
          database.close();
          resolve(updatedAnimal);
        };
      };

      transaction.onerror = () => {
        database.close();
        reject(
          transaction.error ??
            new Error("Nie udało się zaktualizować zwierzęcia."),
        );
      };
    });
  },

  async delete(id: string): Promise<void> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(
        STORE_NAME,
        "readwrite",
      );

      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => {
        reject(
          request.error ??
            new Error("Nie udało się usunąć zwierzęcia."),
        );
      };

      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
    });
  },
};
