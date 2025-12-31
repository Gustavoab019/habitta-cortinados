import { Schema, model, models, type HydratedDocument, type Model } from "mongoose";

export type FabricType = "sheer" | "blackout" | "dimout";
export type FabricPriceTier = 1 | 2 | 3;

export interface Fabric {
  name: string;
  supplier: string;
  imageUrl: string;
  type: FabricType;
  priceTier: FabricPriceTier;
  isActive: boolean;
}

export type FabricDocument = HydratedDocument<Fabric>;

const fabricSchema = new Schema<Fabric>(
  {
    name: { type: String, required: true },
    supplier: { type: String, required: true },
    imageUrl: { type: String, required: true },
    type: { type: String, enum: ["sheer", "blackout", "dimout"], required: true },
    priceTier: { type: Number, enum: [1, 2, 3], required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const FabricModel: Model<Fabric> = models.Fabric || model<Fabric>("Fabric", fabricSchema);
