-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('To_Do', 'In_Progress', 'Done');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stage" "Stage" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
