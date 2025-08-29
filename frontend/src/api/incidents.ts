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
  
  // Check if body is FormData, if so don't set Content-Type header
  const isFormData = options.body instanceof FormData;
  
  const config: RequestInit = {
    headers: isFormData ? {
      ...options.headers,
    } : {
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
  create: async (data: CreateIncidentRequest & { file?: File }): Promise<Incident> => {
    if (data.file) {
      // Handle file upload with FormData
      const formData = new FormData();
      
      // Add form fields
      formData.append('title', data.title);
      formData.append('incident_type', data.incident_type);
      
      if (data.description) {
        formData.append('description', data.description);
      }
      if (data.location) {
        formData.append('location', data.location);
      }
      
      // Add the file
      formData.append('image', data.file);
      
      return apiRequest<Incident>("/incidents", {
        method: "POST",
        headers: {}, // Don't set Content-Type, let browser set it for FormData
        body: formData,
      });
    } else {
      // Regular JSON request without file
      const { file, ...requestData } = data;
      return apiRequest<Incident>("/incidents", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
    }
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
