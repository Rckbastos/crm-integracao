import { z } from "zod";

const phoneSchema = z
  .string()
  .min(8)
  .regex(/^[0-9+()\\s-]+$/);

export const createSubmissionSchema = z
  .object({
    gatewayName: z.string().min(1),
    gatewayLogoName: z.string().nullable().optional().default(null),
    whitelabelName: z.string().min(1),
    responsibleName: z.string().min(1),
    responsibleEmail: z.string().email(),
    responsiblePhone: phoneSchema,
    developerName: z.string().min(1),
    developerEmail: z.string().email(),
    developerPhone: phoneSchema,
    apiDocUrl: z.string().url().nullable().optional().default(null),
    apiDocFileName: z.string().nullable().optional().default(null),
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

export const updateSubmissionSchema = z
  .object({
    gatewayName: z.string().min(1).optional(),
    gatewayLogoName: z.string().nullable().optional(),
    whitelabelName: z.string().min(1).optional(),
    responsibleName: z.string().min(1).optional(),
    responsibleEmail: z.string().email().optional(),
    responsiblePhone: phoneSchema.optional(),
    developerName: z.string().min(1).optional(),
    developerEmail: z.string().email().optional(),
    developerPhone: phoneSchema.optional(),
    apiDocUrl: z.string().url().nullable().optional(),
    apiDocFileName: z.string().nullable().optional(),
    paymentMethods: z.array(z.string().min(1)).min(1).optional(),
    sandboxKeys: z.string().min(1).optional(),
    productionAccount: z.string().nullable().optional(),
    status: z
      .enum(["Pendente", "Aguardando", "Integrando", "Concluido", "Rejeitado"])
      .optional(),
  })
  .strict();
