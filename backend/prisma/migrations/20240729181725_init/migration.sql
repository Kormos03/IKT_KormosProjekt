-- CreateTable
CREATE TABLE "Not_Reserved" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "extra" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Reserved" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "extra" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Token" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "expiration" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "expiration" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AdminToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Not_Reserved_dateStart_dateEnd_key" ON "Not_Reserved"("dateStart", "dateEnd");

-- CreateIndex
CREATE UNIQUE INDEX "Reserved_dateStart_dateEnd_key" ON "Reserved"("dateStart", "dateEnd");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Images_name_key" ON "Images"("name");
