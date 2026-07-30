import { api } from "./api";
import type { Marker } from "../../types/Marker";

class MarkerService {
  async getMarkers(): Promise<Marker[]> {
    return await api.get("/markers");
  }

  async getMarker(id: number): Promise<Marker> {
    return await api.get(`/markers/${id}`);
  }

  async createMarker(marker: Omit<Marker, "id">) {
    return await api.post("/admin/marker", marker);
  }

  async updateMarker(id: number, marker: Partial<Marker>) {
    return await api.put(`/admin/marker/${id}`, marker);
  }

  async deleteMarker(id: number) {
    return await api.delete(`/admin/marker/${id}`);
  }
}

export const markerService = new MarkerService();