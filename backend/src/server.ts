import "dotenv/config";
import path from "path";
import express from "express";
import submissionsRoutes from "./routes/submissions.routes";
import corsMiddleware from "./middleware/cors.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";

const app = express();
const port = Number(process.env.PORT || 3333);

app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));

const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.redirect("/cadastro");
});

app.get("/cadastro", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(publicDir, "admin.html"));
});

app.get("/admin.html", (_req, res) => {
  res.sendFile(path.join(publicDir, "admin.html"));
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", submissionsRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
