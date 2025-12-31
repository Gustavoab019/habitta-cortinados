import type { NextRequest } from "next/server";
import { env } from "./env";

export function getBearerToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token.trim();
}

export function isAdminRequest(request: NextRequest): boolean {
  const token = getBearerToken(request);
  return token === env.ADMIN_TOKEN;
}
