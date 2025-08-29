export interface IncidentResponse {
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
  incidents: IncidentResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
