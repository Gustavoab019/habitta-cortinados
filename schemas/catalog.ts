import { z } from "zod";

export const fabricTypeSchema = z.enum(["sheer", "blackout", "dimout"]);
export const priceTierSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export const fabricDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  supplier: z.string(),
  imageUrl: z.string().url().or(z.literal("")),
  type: fabricTypeSchema,
  priceTier: priceTierSchema,
  isActive: z.boolean()
});

export const railKindSchema = z.enum(["none", "single", "double", "motorized"]);

export const railDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: railKindSchema,
  imageUrl: z.string().url().or(z.literal("")),
  basePrice: z.number(),
  isActive: z.boolean()
});

export const catalogResponseSchema = z.object({
  fabrics: z.array(fabricDtoSchema),
  rails: z.array(railDtoSchema)
});

export type FabricDto = z.infer<typeof fabricDtoSchema>;
export type RailDto = z.infer<typeof railDtoSchema>;
export type CatalogResponse = z.infer<typeof catalogResponseSchema>;
