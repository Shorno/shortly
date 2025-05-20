/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Links";

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "generatedID" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortURL_key" ON "Link"("shortURL");

-- CreateIndex
CREATE UNIQUE INDEX "Link_generatedID_key" ON "Link"("generatedID");
