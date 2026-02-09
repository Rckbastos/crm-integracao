-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "gateway_name" TEXT NOT NULL,
    "gateway_logo_name" TEXT,
    "whitelabel_name" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "responsible_email" TEXT NOT NULL,
    "responsible_phone" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "developer_email" TEXT NOT NULL,
    "developer_phone" TEXT NOT NULL,
    "api_doc_url" TEXT,
    "api_doc_file_name" TEXT,
    "payment_methods" TEXT NOT NULL,
    "sandbox_keys" TEXT NOT NULL,
    "production_account" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "submissions_request_id_key" ON "submissions"("request_id");
