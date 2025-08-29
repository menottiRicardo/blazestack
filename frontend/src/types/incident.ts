export interface Incident {
  _id: string;
  title: string;
  description?: string;
  incident_type: "fire" | "medical" | "security" | "other";
  location?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateIncidentRequest {
  title: string;
  description?: string;
  incident_type: "fire" | "medical" | "security" | "other";
  location?: string;
  image?: string;
}

export interface IncidentsListResponse {
  incidents: Array<Incident>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const INCIDENT_TYPES = [
  { value: "fire", label: "Fire 🔥" },
  { value: "medical", label: "Medical 🚑" },
  { value: "security", label: "Security 🚨" },
  { value: "other", label: "Other ⚠️" },
] as const;
