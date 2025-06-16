/*
  Warnings:

  - You are about to drop the column `uuid` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `OauthState` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Edge" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Edge" ("createdAt", "flowId", "hidden", "id", "label", "markerEnd", "source", "target", "type", "updatedAt") SELECT "createdAt", "flowId", "hidden", "id", "label", "markerEnd", "source", "target", "type", "updatedAt" FROM "Edge";
DROP TABLE "Edge";
ALTER TABLE "new_Edge" RENAME TO "Edge";
CREATE TABLE "new_Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Node" ("createdAt", "description", "flowId", "height", "hidden", "id", "position", "styles", "type", "updatedAt", "width") SELECT "createdAt", "description", "flowId", "height", "hidden", "id", "position", "styles", "type", "updatedAt", "width" FROM "Node";
DROP TABLE "Node";
ALTER TABLE "new_Node" RENAME TO "Node";
CREATE TABLE "new_OauthState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "redirectUrl" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_OauthState" ("createdAt", "expiresAt", "id", "redirectUrl") SELECT "createdAt", "expiresAt", "id", "redirectUrl" FROM "OauthState";
DROP TABLE "OauthState";
ALTER TABLE "new_OauthState" RENAME TO "OauthState";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
