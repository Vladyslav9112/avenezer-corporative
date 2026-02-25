-- AlterTable
ALTER TABLE "LessonAccess" ADD COLUMN     "completedLessons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastCompletedAt" TIMESTAMP(3);
