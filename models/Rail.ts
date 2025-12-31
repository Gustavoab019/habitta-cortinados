import { Schema, model, models, type HydratedDocument, type Model } from "mongoose";

export type RailKind = "none" | "single" | "double" | "motorized";

export interface Rail {
  name: string;
  kind: RailKind;
  imageUrl: string;
  basePrice: number;
  isActive: boolean;
}

export type RailDocument = HydratedDocument<Rail>;

const railSchema = new Schema<Rail>(
  {
    name: { type: String, required: true },
    kind: { type: String, enum: ["none", "single", "double", "motorized"], required: true },
    imageUrl: { type: String, required: true },
    basePrice: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const RailModel: Model<Rail> = models.Rail || model<Rail>("Rail", railSchema);
