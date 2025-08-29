import express from "express";
import { z } from "zod";
import { Incident } from "../models/incident.js";
import { uploadIncidentImage } from "../middleware/upload.js";
import type {
  CreateIncidentRequest,
  IncidentResponse,
  IncidentsListResponse,
} from "../interfaces/incident-response.js";
import type ErrorResponse from "../interfaces/error-response.js";

const router = express.Router();

// Validation schemas
const createIncidentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  incident_type: z.enum(["fire", "medical", "security", "other"]),
  location: z.string().max(200, "Location too long").optional(),
  image: z.string().optional(),
});

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

// Create incident
router.post("/", uploadIncidentImage, async (req, res) => {
  try {
    // When using FormData, we need to construct the data object manually
    const requestData = {
      title: req.body.title,
      description: req.body.description || undefined,
      incident_type: req.body.incident_type,
      location: req.body.location || undefined,
      image: req.file ? req.file.filename : undefined,
    };

    const validatedData = createIncidentSchema.parse(requestData);

    const incident = new Incident(validatedData);
    await incident.save();

    const response: IncidentResponse = {
      _id: (incident._id as any).toString(),
      title: incident.title,
      description: incident.description,
      incident_type: incident.incident_type,
      location: incident.location,
      image: incident.image,
      created_at: incident.created_at.toISOString(),
      updated_at: incident.updated_at.toISOString(),
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      } as ErrorResponse);
    } else if (
      error instanceof Error &&
      error.message.includes("Only image files")
    ) {
      res.status(400).json({
        message: error.message,
      } as ErrorResponse);
    } else {
      console.error("Error creating incident:", error);
      res.status(500).json({
        message: "Internal server error",
      } as ErrorResponse);
    }
  }
});

// Get incidents list
router.get<object, IncidentsListResponse | ErrorResponse>(
  "/",
  async (req, res) => {
    try {
      const { page, limit } = querySchema.parse(req.query);
      const skip = (page - 1) * limit;

      const [incidents, total] = await Promise.all([
        Incident.find({})
          .sort({ created_at: -1 }) // Reverse chronological order
          .skip(skip)
          .limit(limit)
          .lean(),
        Incident.countDocuments({}),
      ]);

      const incidentResponses: IncidentResponse[] = incidents.map(
        (incident) => ({
          _id: (incident._id as any).toString(),
          title: incident.title,
          description: incident.description,
          incident_type: incident.incident_type,
          location: incident.location,
          image: incident.image,
          created_at: incident.created_at.toISOString(),
          updated_at: incident.updated_at.toISOString(),
        })
      );

      const totalPages = Math.ceil(total / limit);

      const response: IncidentsListResponse = {
        incidents: incidentResponses,
        total,
        page,
        limit,
        totalPages,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

// Get single incident by ID
router.get<{ id: string }, IncidentResponse | ErrorResponse>(
  "/:id",
  async (req, res) => {
    try {
      const incident = await Incident.findById(req.params.id).lean();

      if (!incident) {
        res.status(404).json({
          message: "Incident not found",
        });
        return;
      }

      const response: IncidentResponse = {
        _id: (incident._id as any).toString(),
        title: incident.title,
        description: incident.description,
        incident_type: incident.incident_type,
        location: incident.location,
        image: incident.image,
        created_at: incident.created_at.toISOString(),
        updated_at: incident.updated_at.toISOString(),
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching incident:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

export default router;
