-- CreateTable
CREATE TABLE "URL" (
    "id" SERIAL NOT NULL,
    "originalURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "generatedID" TEXT NOT NULL,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortURL_key" ON "URL"("shortURL");

-- CreateIndex
CREATE UNIQUE INDEX "URL_generatedID_key" ON "URL"("generatedID");
