-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('ONE', 'TWO', 'THREE');

-- AlterTable
ALTER TABLE "Enigma" ADD COLUMN     "difficultyNew" "difficulty";
