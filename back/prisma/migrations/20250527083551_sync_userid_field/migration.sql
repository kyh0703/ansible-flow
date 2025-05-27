/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cond` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `dstNodeId` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `edgeId` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `srcNodeId` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - Added the required column `source` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Made the column `markerEnd` on table `Edge` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `height` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `styles` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OauthState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Edge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "markerEnd" JSONB NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Edge" ("createdAt", "flowId", "hidden", "id", "markerEnd", "updatedAt") SELECT "createdAt", "flowId", "hidden", "id", "markerEnd", "updatedAt" FROM "Edge";
DROP TABLE "Edge";
ALTER TABLE "new_Edge" RENAME TO "Edge";
CREATE TABLE "new_Flow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Flow_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Flow" ("createdAt", "id", "name", "projectId", "updatedAt") SELECT "createdAt", "id", "name", "projectId", "updatedAt" FROM "Flow";
DROP TABLE "Flow";
ALTER TABLE "new_Flow" RENAME TO "Flow";
CREATE TABLE "new_Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "styles" JSONB NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Node" ("createdAt", "flowId", "id", "updatedAt") SELECT "createdAt", "flowId", "id", "updatedAt" FROM "Node";
DROP TABLE "Node";
ALTER TABLE "new_Node" RENAME TO "Node";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "provider" TEXT,
    "providerId" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "OauthState_state_key" ON "OauthState"("state");
