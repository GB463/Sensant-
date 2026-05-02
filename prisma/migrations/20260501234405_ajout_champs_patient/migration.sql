/*
  Warnings:

  - Added the required column `dateNaissance` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "dateNaissance" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sexe" TEXT NOT NULL;
