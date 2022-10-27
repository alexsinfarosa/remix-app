import type { User, Note } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getTool({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true },
    where: { id, userId },
  });
}
