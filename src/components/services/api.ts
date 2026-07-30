const API_URL = import.meta.env.VITE_API_URL;

async function request(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.token||'',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd serwera");
  }

  return data;
}

export const api = {
  get: (endpoint: string) =>
    request(endpoint),

  post: (endpoint: string, body: any) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint: string, body: any) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string) =>
    request(endpoint, {
      method: "DELETE",
    }),

  request
};