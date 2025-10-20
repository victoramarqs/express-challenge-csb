/*
  Warnings:

  - Added the required column `transactionId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "transactionId" TEXT NOT NULL;
