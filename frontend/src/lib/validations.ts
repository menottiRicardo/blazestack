import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional().or(z.literal("")),
  incident_type: z.enum(["fire", "medical", "security", "other"]),
  location: z.string().max(200, "Location must be less than 200 characters").optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
});

export type CreateIncidentFormData = z.infer<typeof createIncidentSchema>;
