import type { Animal } from "../../types/Animal";

const DATABASE_NAME = "meowlyDatabase";
const DATABASE_VERSION = 1;
const STORE_NAME = "animals";

type IndexedDbWithDatabaseList = IDBFactory & {
  databases?: () => Promise<Array<{ name?: string; version?: number }>>;
};

/**
 * Reads the browser-local catalogue without using the authenticated animal
 * service. The transaction is deliberately read-only.
 */
export async function readPublicAnimals(): Promise<Animal[]> {
  if (!("indexedDB" in window)) return [];

  const factory = window.indexedDB as IndexedDbWithDatabaseList;

  if (factory.databases) {
    const databases = await factory.databases();
    if (!databases.some((database) => database.name === DATABASE_NAME)) {
      return [];
    }
  }

  return new Promise((resolve, reject) => {
    const request = factory.open(DATABASE_NAME, DATABASE_VERSION);
    let databaseWasMissing = false;

    request.onupgradeneeded = () => {
      databaseWasMissing = true;
      request.transaction?.abort();
    };

    request.onerror = () => {
      if (databaseWasMissing || request.error?.name === "AbortError") {
        resolve([]);
        return;
      }
      reject(request.error ?? new Error("Nie udało się otworzyć katalogu."));
    };

    request.onsuccess = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.close();
        resolve([]);
        return;
      }

      const transaction = database.transaction(STORE_NAME, "readonly");
      const getAllRequest = transaction.objectStore(STORE_NAME).getAll();

      getAllRequest.onsuccess = () => {
        const animals = (getAllRequest.result as Animal[]).sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime(),
        );
        resolve(animals);
      };
      getAllRequest.onerror = () =>
        reject(getAllRequest.error ?? new Error("Nie udało się odczytać katalogu."));

      transaction.oncomplete = () => database.close();
      transaction.onabort = () => database.close();
      transaction.onerror = () => database.close();
    };
  });
}
