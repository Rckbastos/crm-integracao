import { z } from "zod";

const phoneSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    return value.replace(/\\D/g, "");
  },
  z
    .string()
    .min(10, "Telefone inválido")
    .max(13, "Telefone inválido")
);

export const createSubmissionSchema = z
  .object({
    gatewayName: z.string().min(1),
    gatewayLogoName: z.string().nullable().optional().default(null),
    gatewayLogoPath: z.string().nullable().optional().default(null),
    whitelabelName: z.string().min(1),
    responsibleName: z.string().min(1),
    responsibleEmail: z.string().email(),
    responsiblePhone: phoneSchema,
    developerName: z.string().min(1),
    developerEmail: z.string().email(),
    developerPhone: phoneSchema,
    apiDocUrl: z.string().url().nullable().optional().default(null),
    apiDocFileName: z.string().nullable().optional().default(null),
    apiDocFilePath: z.string().nullable().optional().default(null),
    paymentMethods: z.array(z.string().min(1)).min(1),
    sandboxKeys: z.string().min(1),
    productionAccount: z.string().nullable().optional().default(null),
  })
  .refine(
    (data) => Boolean(data.apiDocUrl || data.apiDocFileName),
    {
      message: "API documentation URL or file name is required.",
      path: ["apiDocUrl"],
    }
  );

const updateSubmissionBaseSchema = z
  .object({
    gatewayName: z.string().min(1).optional(),
    gatewayLogoName: z.string().nullable().optional(),
    gatewayLogoPath: z.string().nullable().optional(),
    whitelabelName: z.string().min(1).optional(),
    responsibleName: z.string().min(1).optional(),
    responsibleEmail: z.string().email().optional(),
    responsiblePhone: phoneSchema.optional(),
    developerName: z.string().min(1).optional(),
    developerEmail: z.string().email().optional(),
    developerPhone: phoneSchema.optional(),
    apiDocUrl: z.string().url().nullable().optional(),
    apiDocFileName: z.string().nullable().optional(),
    apiDocFilePath: z.string().nullable().optional(),
    paymentMethods: z.array(z.string().min(1)).min(1).optional(),
    sandboxKeys: z.string().min(1).optional(),
    productionAccount: z.string().nullable().optional(),
    status: z
      .enum(["Pendente", "Aguardando", "Integrando", "Concluido", "Rejeitado"])
      .optional(),
    rejectedReason: z
      .enum([
        "COMPLIANCE",
        "DOCUMENTACAO_INCOMPLETA",
        "INCOMPATIVEL_TECNICAMENTE",
        "FORA_DE_ESCOPO",
        "DUPLICADA",
        "OUTRO",
      ])
      .optional(),
    rejectedDetails: z.string().nullable().optional(),
    rejectedBy: z.string().nullable().optional(),
  })
  .strict();

export const updateSubmissionSchema = updateSubmissionBaseSchema.refine(
    (data) => {
      if (data.status === "Rejeitado") {
        return Boolean(data.rejectedReason);
      }
      return true;
    },
    {
      message: "rejectedReason is required when status is Rejeitado.",
      path: ["rejectedReason"],
    }
  );
