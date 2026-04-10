/*
  Warnings:

  - Made the column `fullName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profilePictureURL` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `UserProfile` MODIFY `fullName` VARCHAR(100) NOT NULL,
    MODIFY `userName` VARCHAR(100) NOT NULL,
    MODIFY `profilePictureURL` VARCHAR(255) NOT NULL;
