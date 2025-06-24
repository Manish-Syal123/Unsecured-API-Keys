-- CreateTable
CREATE TABLE "ApiKey" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unverified',
    "verifiedAt" TIMESTAMP(3),
    "firstFound" TIMESTAMP(3) NOT NULL,
    "repoName" TEXT,
    "owner" TEXT,
    "filePath" TEXT,
    "context" TEXT,
    "lineNumber" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApiKey_provider_idx" ON "ApiKey"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_slug_key" ON "Provider"("slug");
