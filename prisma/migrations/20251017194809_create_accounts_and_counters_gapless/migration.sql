-- CreateTable
CREATE TABLE "counters" (
    "name" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "last_value" BIGINT NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("name","branch_code")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "account_number_base" BIGINT NOT NULL,
    "account_number_dv" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_branch_code_account_number_base_key" ON "accounts"("branch_code", "account_number_base");
