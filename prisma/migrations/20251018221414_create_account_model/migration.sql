-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accountNumberBase" SERIAL NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountNumberBase_key" ON "Account"("accountNumberBase");
