-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WORKOUT', 'STUDY', 'URGENT');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED', 'DONE', 'MISSED');

-- CreateEnum
CREATE TYPE "NotificationTiming" AS ENUM ('AT_TIME_OF_EVENT', 'TEN_MINUTES_BEFORE', 'THIRTY_MINUTES_BEFORE', 'ONE_HOUR_BEFORE', 'ONE_DAY_BEFORE', 'THREE_DAYS_BEFORE');

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "dateTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "notificationTiming" "NotificationTiming"[],

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
