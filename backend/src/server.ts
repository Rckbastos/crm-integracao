import "dotenv/config";
import express from "express";
import submissionsRoutes from "./routes/submissions.routes";
import corsMiddleware from "./middleware/cors.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";

const app = express();
const port = Number(process.env.PORT || 3333);

app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", submissionsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
