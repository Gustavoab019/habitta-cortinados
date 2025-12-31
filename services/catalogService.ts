import { connectToDatabase } from "../lib/db";
import { FabricModel } from "../models/Fabric";
import { RailModel } from "../models/Rail";
import type { Fabric } from "../models/Fabric";
import type { Rail } from "../models/Rail";
import type { CatalogResponse, FabricDto, RailDto } from "../schemas/catalog";

function mapFabric(doc: Fabric & { _id: unknown }): FabricDto {
  return {
    id: String(doc._id),
    name: doc.name,
    supplier: doc.supplier,
    imageUrl: doc.imageUrl,
    type: doc.type,
    priceTier: doc.priceTier,
    isActive: doc.isActive
  };
}

function mapRail(doc: Rail & { _id: unknown }): RailDto {
  return {
    id: String(doc._id),
    name: doc.name,
    kind: doc.kind,
    imageUrl: doc.imageUrl,
    basePrice: doc.basePrice,
    isActive: doc.isActive
  };
}

const fallbackCatalog: CatalogResponse = {
  fabrics: [
    { id: "f1", name: "Linho Areia", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "sheer", priceTier: 1, isActive: true },
    { id: "f2", name: "Veludo Noir", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "blackout", priceTier: 3, isActive: true },
    { id: "f3", name: "Algodão Neve", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "dimout", priceTier: 2, isActive: true }
  ],
  rails: [
    { id: "r1", name: "Calha simples", kind: "single", imageUrl: "https://placehold.co/400x300", basePrice: 40, isActive: true },
    { id: "r2", name: "Calha dupla", kind: "double", imageUrl: "https://placehold.co/400x300", basePrice: 65, isActive: true },
    { id: "r3", name: "Calha motorizada", kind: "motorized", imageUrl: "https://placehold.co/400x300", basePrice: 120, isActive: true }
  ]
};

export async function getCatalog(): Promise<CatalogResponse> {
  try {
    await connectToDatabase();

    const [fabrics, rails] = await Promise.all([
      FabricModel.find({ isActive: true }).lean<Array<Fabric & { _id: unknown }>>(),
      RailModel.find({ isActive: true }).lean<Array<Rail & { _id: unknown }>>()
    ]);

    return {
      fabrics: fabrics.map(mapFabric),
      rails: rails.map(mapRail)
    };
  } catch (error) {
    console.error("Erro ao carregar catálogo, retornando fallback:", error);
    return fallbackCatalog;
  }
}
