/*
  Warnings:

  - The primary key for the `Proposal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Proposal_id_seq";
