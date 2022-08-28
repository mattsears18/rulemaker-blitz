/*
  Warnings:

  - You are about to drop the column `ownerUserId` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_ownerUserId_fkey";

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "ownerUserId",
ADD COLUMN     "createdByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
