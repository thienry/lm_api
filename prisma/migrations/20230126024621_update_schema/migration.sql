/*
  Warnings:

  - You are about to drop the column `role` on the `Mapping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mapping" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
