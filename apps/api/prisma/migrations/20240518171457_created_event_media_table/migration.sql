/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_eventID_fkey`;

-- DropTable
DROP TABLE `Media`;

-- CreateTable
CREATE TABLE `EventMedia` (
    `id` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `eventID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventMedia` ADD CONSTRAINT `EventMedia_eventID_fkey` FOREIGN KEY (`eventID`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
