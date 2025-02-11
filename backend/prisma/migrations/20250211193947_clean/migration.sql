-- AlterTable
ALTER TABLE "Enigma" ADD COLUMN     "image" TEXT,
ADD COLUMN     "numberOfHours" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "numberOfParticipants" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
