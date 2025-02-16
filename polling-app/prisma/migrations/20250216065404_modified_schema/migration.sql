/*
  Warnings:

  - You are about to drop the column `ques` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `question` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollId_fkey";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "ques",
ADD COLUMN     "question" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Option_pollId_idx" ON "Option"("pollId");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
