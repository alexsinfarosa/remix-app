import type { Tool } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Tool } from "@prisma/client";

export function getToolListItems() {
  return prisma.tool.findMany({
    orderBy: { name: "asc" },
  });
}

export function getTool({ slug }: Pick<Tool, "slug">) {
  return prisma.tool.findFirst({
    where: { slug },
  });
}
