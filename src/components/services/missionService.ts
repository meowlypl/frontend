import { api } from "./api";
import type { Mission } from "../../types/Mission";

class MissionService {
  async getMissions(): Promise<Mission[]> {
    return api.get("/missions");
  }

  async getMission(id: number): Promise<Mission> {
    return api.get(`/missions/${id}`);
  }

  async createMission(mission: Omit<Mission, "id">) {
    return api.post("/missions", mission);
  }

  async updateMission(
    id: number,
    mission: Partial<Mission>
  ) {
    return api.put(`/missions/${id}`, mission);
  }

  async deleteMission(id: number) {
    return api.delete(`/missions/${id}`);
  }

  async completeMission(id: number) {
    return api.post(`/missions/${id}/complete`, {});
  }

  async getNearbyMissions(
    lat: number,
    lng: number
  ): Promise<Mission[]> {
    return api.get(
      `/missions/nearby?lat=${lat}&lng=${lng}`
    );
  }

  async getUserMissions(userId: number): Promise<Mission[]> {
    return api.get(`/users/${userId}/missions`);
  }
}

export const missionService = new MissionService();
