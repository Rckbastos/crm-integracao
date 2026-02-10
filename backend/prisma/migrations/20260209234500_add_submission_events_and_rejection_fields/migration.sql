-- AlterTable
ALTER TABLE "submissions" ADD COLUMN "rejected_reason" TEXT;
ALTER TABLE "submissions" ADD COLUMN "rejected_details" TEXT;
ALTER TABLE "submissions" ADD COLUMN "rejected_at" TIMESTAMP(3);
ALTER TABLE "submissions" ADD COLUMN "rejected_by" TEXT;
ALTER TABLE "submissions" ADD COLUMN "last_event" TEXT;
ALTER TABLE "submissions" ADD COLUMN "last_event_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "submission_events" (
    "id" TEXT NOT NULL,
    "submission_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,

    CONSTRAINT "submission_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "submission_events_submission_id_created_at_idx" ON "submission_events" ("submission_id", "created_at" DESC);
CREATE INDEX "submissions_status_created_at_idx" ON "submissions" ("status", "created_at");
CREATE INDEX "submissions_rejected_reason_idx" ON "submissions" ("rejected_reason");

-- AddForeignKey
ALTER TABLE "submission_events" ADD CONSTRAINT "submission_events_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
