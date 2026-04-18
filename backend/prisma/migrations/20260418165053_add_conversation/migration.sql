-- CreateEnum
CREATE TYPE "ConversationState" AS ENUM ('COLLECTING', 'CONFIRMING', 'DONE');

-- CreateTable
CREATE TABLE "conversations" (
    "id" SERIAL NOT NULL,
    "messages" JSONB NOT NULL,
    "state" "ConversationState" NOT NULL DEFAULT 'COLLECTING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);
