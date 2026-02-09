import { Router } from "express";
import {
  createSubmissionHandler,
  deleteSubmissionHandler,
  getSubmissionHandler,
  listSubmissionsHandler,
  updateSubmissionHandler,
} from "../controllers/submissions.controller";

const router = Router();

router.post("/submissions", createSubmissionHandler);
router.get("/submissions", listSubmissionsHandler);
router.get("/submissions/:id", getSubmissionHandler);
router.put("/submissions/:id", updateSubmissionHandler);
router.delete("/submissions/:id", deleteSubmissionHandler);

export default router;
