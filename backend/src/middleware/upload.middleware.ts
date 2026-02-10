import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir =
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  process.env.UPLOAD_DIR ||
  path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (
    _req: Express.Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir);
  },
  filename: (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedLogo = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
  const allowedDoc = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (file.fieldname === "gatewayLogo" && allowedLogo.includes(file.mimetype)) {
    cb(null, true);
  } else if (
    file.fieldname === "apiDocumentation" &&
    allowedDoc.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}`));
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "gatewayLogo", maxCount: 1 },
  { name: "apiDocumentation", maxCount: 1 },
]);
