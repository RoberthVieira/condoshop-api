/*
  Warnings:

  - You are about to drop the column `categoriaID` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "categoriaID",
ADD COLUMN     "categoriaId" INTEGER;
