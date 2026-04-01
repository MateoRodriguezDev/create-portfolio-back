/*
  Warnings:

  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `technologyId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePictureURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Added the required column `userProfileId` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Link` DROP FOREIGN KEY `Link_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_technologyId_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_titleId_fkey`;

-- DropIndex
DROP INDEX `Link_userId_fkey` ON `Link`;

-- DropIndex
DROP INDEX `Project_technologyId_fkey` ON `Project`;

-- DropIndex
DROP INDEX `Project_userId_fkey` ON `Project`;

-- DropIndex
DROP INDEX `User_titleId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `Link` DROP COLUMN `userId`,
    ADD COLUMN `userProfileId` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `technologyId`,
    DROP COLUMN `userId`,
    ADD COLUMN `userProfileId` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `fullName`,
    DROP COLUMN `profilePictureURL`,
    DROP COLUMN `titleId`,
    DROP COLUMN `userName`;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `userName` VARCHAR(100) NOT NULL,
    `profilePictureURL` VARCHAR(255) NOT NULL,
    `titleId` INTEGER NULL,
    `userId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTechnology` (
    `projectId` INTEGER NOT NULL,
    `technologyId` INTEGER NOT NULL,

    PRIMARY KEY (`projectId`, `technologyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `Title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `email` TO `User_email_key`;
