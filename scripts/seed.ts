import fs from "fs";
import path from "path";

function loadEnvFiles() {
  const possibleFiles = [".env.local", ".env"];
  possibleFiles.forEach((fileName) => {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) {
      return;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }
      const [key, ...rest] = trimmed.split("=");
      let value = rest.join("=").trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    });
  });
}

async function main() {
  // Load environment variables BEFORE any imports that depend on them
  loadEnvFiles();

  // Use dynamic imports to ensure env vars are loaded first
  const { connectToDatabase } = await import("../lib/db");
  const { FabricModel } = await import("../models/Fabric");
  const { RailModel } = await import("../models/Rail");

  await connectToDatabase();

  const fabrics = [
    { name: "Linho Areia", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "sheer", priceTier: 1, isActive: true },
    { name: "Veludo Noir", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "blackout", priceTier: 3, isActive: true },
    { name: "Algodão Neve", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "dimout", priceTier: 2, isActive: true },
    { name: "Linho Grafite", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "dimout", priceTier: 2, isActive: true },
    { name: "Wave Bruma", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "sheer", priceTier: 1, isActive: true },
    { name: "Wave Terra", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "sheer", priceTier: 1, isActive: true },
    { name: "Blackout Noite", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "blackout", priceTier: 3, isActive: true },
    { name: "Blackout Marfim", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "blackout", priceTier: 2, isActive: true },
    { name: "Algodão Pistache", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "dimout", priceTier: 2, isActive: true },
    { name: "Algodão Âmbar", supplier: "Habitta", imageUrl: "https://placehold.co/400x300", type: "dimout", priceTier: 2, isActive: true }
  ];

  const rails = [
    { name: "Sem calha", kind: "none", imageUrl: "https://placehold.co/400x300", basePrice: 0, isActive: true },
    { name: "Calha simples", kind: "single", imageUrl: "https://placehold.co/400x300", basePrice: 40, isActive: true },
    { name: "Calha dupla", kind: "double", imageUrl: "https://placehold.co/400x300", basePrice: 65, isActive: true },
    { name: "Calha motorizada", kind: "motorized", imageUrl: "https://placehold.co/400x300", basePrice: 120, isActive: true },
    { name: "Calha décor", kind: "single", imageUrl: "https://placehold.co/400x300", basePrice: 80, isActive: true }
  ];

  await FabricModel.bulkWrite(
    fabrics.map((fabric) => ({
      updateOne: {
        filter: { name: fabric.name },
        update: { $set: fabric },
        upsert: true
      }
    }))
  );

  await RailModel.bulkWrite(
    rails.map((rail) => ({
      updateOne: {
        filter: { name: rail.name },
        update: { $set: rail },
        upsert: true
      }
    }))
  );

  console.log("Seed concluído: tecidos e calhas inseridos/atualizados.");
  process.exit(0);
}

main().catch((error) => {
  console.error("Erro ao executar seed:", error);
  process.exit(1);
});
