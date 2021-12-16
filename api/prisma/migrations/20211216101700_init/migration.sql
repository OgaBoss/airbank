-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BOOKED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'GBP');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "reference" TEXT,
    "currency" "Currency" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
