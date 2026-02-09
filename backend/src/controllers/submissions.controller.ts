import { Request, Response, NextFunction } from "express";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  listSubmissions,
  updateSubmission,
} from "../services/submissions.service";
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from "../validators/submissions.validator";

function mapSubmissionResponse(submission: any) {
  return {
    id: submission.request_id,
    internalId: submission.id,
    gatewayName: submission.gateway_name,
    gatewayLogoName: submission.gateway_logo_name,
    whitelabelName: submission.whitelabel_name,
    responsibleName: submission.responsible_name,
    responsibleEmail: submission.responsible_email,
    responsiblePhone: submission.responsible_phone,
    developerName: submission.developer_name,
    developerEmail: submission.developer_email,
    developerPhone: submission.developer_phone,
    apiDocUrl: submission.api_doc_url,
    apiDocFileName: submission.api_doc_file_name,
    paymentMethods: JSON.parse(submission.payment_methods || "[]"),
    sandboxKeys: submission.sandbox_keys,
    productionAccount: submission.production_account,
    status: submission.status,
    approvedAt: submission.approved_at,
    integrandoAt: submission.integrando_at,
    concluidoAt: submission.concluido_at,
    createdAt: submission.created_at,
    updatedAt: submission.updated_at,
  };
}

export async function createSubmissionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = createSubmissionSchema.parse(req.body);
    const { submission, requestId } = await createSubmission(payload);
    res.status(201).json({
      success: true,
      requestId,
      submission: mapSubmissionResponse(submission),
    });
  } catch (error) {
    next(error as Error);
  }
}

export async function listSubmissionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const result = await listSubmissions({
      ...(status ? { status } : {}),
      ...(search ? { search } : {}),
      page: Number.isNaN(page) ? 1 : page,
      limit: Number.isNaN(limit) ? 20 : limit,
    });

    res.json({
      items: result.items.map(mapSubmissionResponse),
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (error) {
    next(error as Error);
  }
}

export async function getSubmissionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Submission id is required" });
      return;
    }
    const submission = await getSubmissionById(id);
    if (!submission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.json(mapSubmissionResponse(submission));
  } catch (error) {
    next(error as Error);
  }
}

export async function updateSubmissionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Submission id is required" });
      return;
    }
    const payload = updateSubmissionSchema.parse(req.body);
    const result = await updateSubmission(id, payload);
    if (result.count === 0) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    next(error as Error);
  }
}

export async function deleteSubmissionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Submission id is required" });
      return;
    }
    const result = await deleteSubmission(id);
    if (result.count === 0) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    next(error as Error);
  }
}
