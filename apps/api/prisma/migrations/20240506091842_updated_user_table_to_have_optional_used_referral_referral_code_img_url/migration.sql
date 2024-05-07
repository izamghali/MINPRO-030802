/*
  Warnings:

  - You are about to alter the column `issuedAt` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Balance` MODIFY `issuedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `usedReferral` BOOLEAN NULL DEFAULT false,
    MODIFY `referralCode` VARCHAR(191) NULL,
    MODIFY `imgUrl` LONGTEXT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
