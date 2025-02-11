/*
  Warnings:

  - You are about to drop the column `difficultyNew` on the `Enigma` table. All the data in the column will be lost.
  - Changed the type of `difficulty` on the `Enigma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('ONE', 'TWO', 'THREE');

-- AlterTable
ALTER TABLE "Enigma" DROP COLUMN "difficultyNew",
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- DropEnum
DROP TYPE "difficulty";
