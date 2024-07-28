import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;