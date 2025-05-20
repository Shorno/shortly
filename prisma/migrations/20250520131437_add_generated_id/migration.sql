/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "URL";

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "generatedID" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_shortURL_key" ON "Links"("shortURL");

-- CreateIndex
CREATE UNIQUE INDEX "Links_generatedID_key" ON "Links"("generatedID");
