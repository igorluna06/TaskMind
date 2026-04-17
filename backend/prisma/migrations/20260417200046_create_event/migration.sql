-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEETING', 'REMINDER', 'TASK');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationTiming" AS ENUM ('AT_TIME_OF_EVENT', 'TEN_MINUTES_BEFORE', 'THIRTY_MINUTES_BEFORE', 'ONE_HOUR_BEFORE', 'ONE_DAY_BEFORE', 'THREE_DAYS_BEFORE');

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "notificationTime" "NotificationTiming" NOT NULL DEFAULT 'TEN_MINUTES_BEFORE',

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
