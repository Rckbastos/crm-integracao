import { Prisma } from "@prisma/client";
import prisma from "../config/database";
import { generateRequestId } from "../utils/requestId.generator";
import {
  SubmissionInput,
  SubmissionUpdateInput,
  SubmissionEventType,
  SubmissionStatus,
} from "../types/submissions.types";

const MAX_REQUEST_ID_ATTEMPTS = 5;
const SYSTEM_ACTOR = "system";

function mapCreateData(input: SubmissionInput) {
  return {
    gateway_name: input.gatewayName,
    gateway_logo_name: input.gatewayLogoName ?? null,
    whitelabel_name: input.whitelabelName,
    responsible_name: input.responsibleName,
    responsible_email: input.responsibleEmail,
    responsible_phone: input.responsiblePhone,
    developer_name: input.developerName,
    developer_email: input.developerEmail,
    developer_phone: input.developerPhone,
    api_doc_url: input.apiDocUrl ?? null,
    api_doc_file_name: input.apiDocFileName ?? null,
    payment_methods: JSON.stringify(input.paymentMethods),
    sandbox_keys: input.sandboxKeys,
    production_account: input.productionAccount ?? null,
  };
}

function mapUpdateData(input: SubmissionUpdateInput) {
  const data: Prisma.SubmissionUpdateInput = {};

  if (input.gatewayName !== undefined) data.gateway_name = input.gatewayName;
  if (input.gatewayLogoName !== undefined) data.gateway_logo_name = input.gatewayLogoName;
  if (input.whitelabelName !== undefined) data.whitelabel_name = input.whitelabelName;
  if (input.responsibleName !== undefined) data.responsible_name = input.responsibleName;
  if (input.responsibleEmail !== undefined) data.responsible_email = input.responsibleEmail;
  if (input.responsiblePhone !== undefined) data.responsible_phone = input.responsiblePhone;
  if (input.developerName !== undefined) data.developer_name = input.developerName;
  if (input.developerEmail !== undefined) data.developer_email = input.developerEmail;
  if (input.developerPhone !== undefined) data.developer_phone = input.developerPhone;
  if (input.apiDocUrl !== undefined) data.api_doc_url = input.apiDocUrl;
  if (input.apiDocFileName !== undefined) data.api_doc_file_name = input.apiDocFileName;
  if (input.paymentMethods !== undefined) {
    data.payment_methods = JSON.stringify(input.paymentMethods);
  }
  if (input.sandboxKeys !== undefined) data.sandbox_keys = input.sandboxKeys;
  if (input.productionAccount !== undefined) {
    data.production_account = input.productionAccount;
  }
  if (input.status !== undefined) data.status = input.status;
  if (input.approvedAt !== undefined) {
    data.approved_at = input.approvedAt ? new Date(input.approvedAt) : null;
  }
  if (input.integrandoAt !== undefined) {
    data.integrando_at = input.integrandoAt ? new Date(input.integrandoAt) : null;
  }
  if (input.concluidoAt !== undefined) {
    data.concluido_at = input.concluidoAt ? new Date(input.concluidoAt) : null;
  }
  if (input.rejectedReason !== undefined) {
    data.rejected_reason = input.rejectedReason ?? null;
  }
  if (input.rejectedDetails !== undefined) {
    data.rejected_details = input.rejectedDetails ?? null;
  }
  if (input.rejectedAt !== undefined) {
    data.rejected_at = input.rejectedAt ? new Date(input.rejectedAt) : null;
  }
  if (input.rejectedBy !== undefined) {
    data.rejected_by = input.rejectedBy ?? null;
  }

  return data;
}

async function createSubmissionEvent(
  tx: Prisma.TransactionClient,
  submissionId: string,
  type: SubmissionEventType,
  message: string,
  metadata?: Prisma.InputJsonValue,
  actor?: string | null
) {
  // Para adicionar novos tipos de evento, inclua no enum SubmissionEventType
  // e use esta função para gravar a timeline (submission_events).
  const event = await tx.submissionEvent.create({
    data: {
      submission_id: submissionId,
      type,
      message,
      ...(metadata !== undefined ? { metadata } : {}),
      created_by: actor ?? SYSTEM_ACTOR,
    },
  });

  await tx.submission.update({
    where: { id: submissionId },
    data: {
      last_event: message,
      last_event_at: event.created_at,
    },
  });

  return event;
}

async function updateSubmissionStatus(
  tx: Prisma.TransactionClient,
  submissionId: string,
  newStatus: SubmissionStatus,
  actor?: string | null,
  metadata?: Prisma.InputJsonValue
) {
  const message = `Status atualizado para ${newStatus}`;
  await createSubmissionEvent(tx, submissionId, "STATUS_CHANGED", message, metadata, actor);
}

async function rejectSubmission(
  tx: Prisma.TransactionClient,
  submissionId: string,
  reason: string,
  details?: string | null,
  actor?: string | null
) {
  const message = `Solicitação rejeitada — motivo: ${reason}`;
  await createSubmissionEvent(
    tx,
    submissionId,
    "REJECTED",
    message,
    { reason, details },
    actor
  );
}

export async function createSubmission(input: SubmissionInput) {
  for (let attempt = 0; attempt < MAX_REQUEST_ID_ATTEMPTS; attempt += 1) {
    const requestId = await generateRequestId();
    try {
      const submission = await prisma.$transaction(async (tx) => {
        const created = await tx.submission.create({
          data: {
            request_id: requestId,
            ...mapCreateData(input),
            status: "Pendente",
          },
        });
        await createSubmissionEvent(
          tx,
          created.id,
          "CREATED",
          "Solicitação criada",
          { requestId },
          SYSTEM_ACTOR
        );
        return created;
      });
      return { submission, requestId };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("Failed to generate unique request id");
}

export async function listSubmissions(params: {
  status?: string;
  search?: string;
  page: number;
  limit: number;
}) {
  const { status, search, page, limit } = params;
  const where: Prisma.SubmissionWhereInput = {
    deleted_at: null,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { gateway_name: { contains: search, mode: "insensitive" } },
      { responsible_name: { contains: search, mode: "insensitive" } },
      { developer_name: { contains: search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.submission.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.submission.count({ where }),
  ]);

  return { items, total, page, limit };
}

export async function getSubmissionById(id: string) {
  return prisma.submission.findFirst({
    where: {
      deleted_at: null,
      OR: [{ id }, { request_id: id }],
    },
  });
}

export async function updateSubmission(id: string, input: SubmissionUpdateInput) {
  return prisma.$transaction(async (tx) => {
    const target = await tx.submission.findFirst({
      where: {
        deleted_at: null,
        OR: [{ id }, { request_id: id }],
      },
    });

    if (!target) {
      return { count: 0 };
    }

    let nextInput = { ...input };

    if (nextInput.status) {
      if (nextInput.status === "Aguardando") {
        nextInput = { ...nextInput, approvedAt: new Date().toISOString() };
      }
      if (nextInput.status === "Integrando") {
        nextInput = { ...nextInput, integrandoAt: new Date().toISOString() };
      }
      if (nextInput.status === "Concluido") {
        nextInput = { ...nextInput, concluidoAt: new Date().toISOString() };
      }
      if (nextInput.status === "Rejeitado") {
        nextInput = {
          ...nextInput,
          rejectedAt: new Date().toISOString(),
          rejectedBy: nextInput.rejectedBy ?? SYSTEM_ACTOR,
        };
      }
    }

    const data = mapUpdateData(nextInput);
    const result = await tx.submission.updateMany({
      where: {
        deleted_at: null,
        OR: [{ id }, { request_id: id }],
      },
      data,
    });

    if (nextInput.status) {
      if (nextInput.status === "Rejeitado") {
        await rejectSubmission(
          tx,
          target.id,
          String(nextInput.rejectedReason),
          nextInput.rejectedDetails ?? null,
          nextInput.rejectedBy ?? SYSTEM_ACTOR
        );
      } else {
        await updateSubmissionStatus(
          tx,
          target.id,
          nextInput.status,
          SYSTEM_ACTOR,
          { from: target.status, to: nextInput.status }
        );
      }
    }

    return result;
  });
}

export async function deleteSubmission(id: string) {
  return prisma.submission.updateMany({
    where: {
      deleted_at: null,
      OR: [{ id }, { request_id: id }],
    },
    data: {
      deleted_at: new Date(),
    },
  });
}
