/*
  Warnings:

  - You are about to alter the column `issuedAt` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `jwt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Balance` MODIFY `issuedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `jwt`;
