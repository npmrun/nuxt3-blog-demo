-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReplyComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "commentId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'NOTADUIT',
    "reason" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "replyCommentId" INTEGER,
    CONSTRAINT "ReplyComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReplyComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReplyComment_replyCommentId_fkey" FOREIGN KEY ("replyCommentId") REFERENCES "ReplyComment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ReplyComment" ("commentId", "content", "createdAt", "id", "reason", "replyCommentId", "status", "title", "updatedAt", "userId") SELECT "commentId", "content", "createdAt", "id", "reason", "replyCommentId", "status", "title", "updatedAt", "userId" FROM "ReplyComment";
DROP TABLE "ReplyComment";
ALTER TABLE "new_ReplyComment" RENAME TO "ReplyComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
