-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "remark" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
