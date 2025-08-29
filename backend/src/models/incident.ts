import mongoose, { Document, Schema } from "mongoose";

export interface IIncident extends Document {
  title: string;
  description?: string;
  incident_type: "fire" | "medical" | "security" | "other";
  location?: string;
  image?: string;
  created_at: Date;
  updated_at: Date;
}

const incidentSchema = new Schema<IIncident>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    incident_type: {
      type: String,
      required: true,
      enum: ["fire", "medical", "security", "other"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Incident = mongoose.model<IIncident>("Incident", incidentSchema);
