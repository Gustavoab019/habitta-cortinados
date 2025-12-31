import { z } from "zod";

const preprocessString = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

const envSchema = z
  .object({
    MONGODB_URI: z.string().url(),
    ADMIN_TOKEN: z.string().min(1),
    NEXT_PUBLIC_ADMIN_TOKEN: z.string().min(1).optional(),
    NEXT_PUBLIC_MEASUREMENT_FEE: z.coerce.number().positive().optional(),
    MEASUREMENT_FEE: z.coerce.number().positive().default(25),
    SMTP_HOST: z.preprocess(preprocessString, z.string().optional()),
    SMTP_PORT: z.preprocess(preprocessString, z.coerce.number().optional()),
    SMTP_USER: z.preprocess(preprocessString, z.string().optional()),
    SMTP_PASSWORD: z.preprocess(preprocessString, z.string().optional()),
    SMTP_FROM: z.preprocess(preprocessString, z.string().email().optional())
  })
  .refine(
    (data) => {
      const smtp = [data.SMTP_HOST, data.SMTP_PORT, data.SMTP_USER, data.SMTP_PASSWORD, data.SMTP_FROM];
      const filled = smtp.filter((value) => value !== undefined).length;
      return filled === 0 || filled === smtp.length;
    },
    { message: "SMTP config must have all fields set or none" }
  );

let cachedEnv: {
  MONGODB_URI: string;
  ADMIN_TOKEN: string;
  NEXT_PUBLIC_ADMIN_TOKEN?: string;
  NEXT_PUBLIC_MEASUREMENT_FEE?: number;
  MEASUREMENT_FEE: number;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  SMTP_FROM?: string;
} | null = null;

function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse({
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    NEXT_PUBLIC_ADMIN_TOKEN: process.env.NEXT_PUBLIC_ADMIN_TOKEN,
    NEXT_PUBLIC_MEASUREMENT_FEE: process.env.NEXT_PUBLIC_MEASUREMENT_FEE,
    MEASUREMENT_FEE: process.env.MEASUREMENT_FEE,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM
  });

  if (!parsed.success) {
    const formattedErrors = parsed.error.format();
    throw new Error(`Invalid environment variables: ${JSON.stringify(formattedErrors, null, 2)}`);
  }

  const envData = parsed.data;

  cachedEnv = {
    ...envData,
    NEXT_PUBLIC_ADMIN_TOKEN: envData.NEXT_PUBLIC_ADMIN_TOKEN ?? envData.ADMIN_TOKEN,
    NEXT_PUBLIC_MEASUREMENT_FEE: envData.NEXT_PUBLIC_MEASUREMENT_FEE ?? envData.MEASUREMENT_FEE
  };

  return cachedEnv;
}

export const env = new Proxy({} as ReturnType<typeof getEnv>, {
  get(_target, prop) {
    return getEnv()[prop as keyof ReturnType<typeof getEnv>];
  }
});

export type Env = ReturnType<typeof getEnv>;
