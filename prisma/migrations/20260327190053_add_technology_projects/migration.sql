/*
  Warnings:

  - You are about to drop the column `techName` on the `TechCategory` table. All the data in the column will be lost.
  - Added the required column `techCategoryName` to the `TechCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TechCategory` DROP COLUMN `techName`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `techCategoryName` VARCHAR(50) NOT NULL,
    MODIFY `imgURL` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Technology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `techName` VARCHAR(50) NOT NULL,
    `imgURL` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `techCategoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(50) NOT NULL,
    `imgURL` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `userId` INTEGER UNSIGNED NOT NULL,
    `technologyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Technology` ADD CONSTRAINT `Technology_techCategoryId_fkey` FOREIGN KEY (`techCategoryId`) REFERENCES `TechCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
