/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `Token` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("createdAt", "id", "refreshToken", "userId") SELECT "createdAt", "id", "refreshToken", "userId" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE INDEX "Token_userId_idx" ON "Token"("userId");
CREATE UNIQUE INDEX "Token_userId_refreshToken_key" ON "Token"("userId", "refreshToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
