import type { CreateIncidentRequest, Incident, IncidentsListResponse } from "@/types/incident";

const API_BASE_URL = "http://localhost:8000/api/v1"; // TODO: change to env variable

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(url);
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData.errors
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}

export const incidentsApi = {
  // Create a new incident
  create: async (data: CreateIncidentRequest): Promise<Incident> => {
    return apiRequest<Incident>("/incidents", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Get incidents list with pagination
  list: async (page = 1, limit = 10): Promise<IncidentsListResponse> => {
    return apiRequest<IncidentsListResponse>(
      `/incidents?page=${page}&limit=${limit}`
    );
  },

  // Get a single incident by ID
  get: async (id: string): Promise<Incident> => {
    return apiRequest<Incident>(`/incidents/${id}`);
  },
};
