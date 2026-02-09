import prisma from "../config/database";

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function nextCounter(lastRequestId: string | null): string {
  if (!lastRequestId) {
    return "00001";
  }

  const parts = lastRequestId.split("-");
  const counter = parts[2];
  const next = Number(counter || 0) + 1;
  return String(next).padStart(5, "0");
}

export async function generateRequestId(): Promise<string> {
  const prefix = `REQ-${formatDate(new Date())}-`;
  const last = await prisma.submission.findFirst({
    where: {
      request_id: {
        startsWith: prefix,
      },
    },
    orderBy: {
      request_id: "desc",
    },
    select: {
      request_id: true,
    },
  });

  const counter = nextCounter(last?.request_id ?? null);
  return `${prefix}${counter}`;
}
