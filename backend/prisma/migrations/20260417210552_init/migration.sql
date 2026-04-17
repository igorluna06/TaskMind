/*
  Warnings:

  - The values [CONFIRMED] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [MEETING,REMINDER,TASK] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `notificationTime` on the `events` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED', 'DONE', 'MISSED');
ALTER TABLE "public"."events" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "events" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "public"."EventStatus_old";
ALTER TABLE "events" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('WORKOUT', 'STUDY', 'URGENT');
ALTER TABLE "events" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
DROP COLUMN "notificationTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notificationTiming" "NotificationTiming" NOT NULL DEFAULT 'TEN_MINUTES_BEFORE';
