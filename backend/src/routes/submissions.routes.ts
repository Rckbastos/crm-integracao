import { Router } from "express";
import {
  createSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionHandler,
  listSubmissionsHandler,
  updateSubmissionHandler,
} from "../controllers/submissions.controller";
import { uploadMiddleware } from "../middleware/upload.middleware";

const router = Router();

router.post("/submissions", uploadMiddleware, createSubmissionHandler);
router.get("/submissions", listSubmissionsHandler);
router.get("/submissions/:id", getSubmissionHandler);
router.put("/submissions/:id", updateSubmissionHandler);
router.delete("/submissions/:id", deleteSubmissionHandler);

export default router;
