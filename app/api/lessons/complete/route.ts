import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { mailer, getFromEmail } from "@/lib/mail";
import { LESSONS_UK } from "@/content/lessons/uk";

export const runtime = "nodejs";

const safe = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(req: Request) {
  try {
    const sessionUser = await getUserFromCookie();
    if (!sessionUser) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = (await req.json()) as { lesson?: number };
    const lessonNumber = Number(body.lesson ?? 0);
    const totalLessons = LESSONS_UK.length;
    const lessonTitle =
      LESSONS_UK[lessonNumber - 1]?.title ?? `Lesson ${lessonNumber}`;

    if (!Number.isInteger(lessonNumber) || lessonNumber < 1) {
      return NextResponse.json(
        { ok: false, error: "Invalid lesson number." },
        { status: 400 },
      );
    }

    if (lessonNumber > totalLessons) {
      return NextResponse.json(
        { ok: false, error: "Lesson does not exist." },
        { status: 404 },
      );
    }

    const la = await prisma.lessonAccess.findUnique({
      where: { userId: sessionUser.id },
      select: {
        status: true,
        paidAt: true,
        profileConfirmedAt: true,
        completedLessons: true,
      },
    });

    const isPaid = la?.status === "ACTIVE" && !!la?.paidAt;
    if (!isPaid || !la?.profileConfirmedAt) {
      return NextResponse.json(
        { ok: false, error: "Access denied." },
        { status: 403 },
      );
    }

    const currentCompleted = la?.completedLessons ?? 0;
    const expectedNext = currentCompleted + 1;

    if (lessonNumber !== expectedNext) {
      return NextResponse.json(
        { ok: false, error: "Complete lessons in order." },
        { status: 409 },
      );
    }

    const updated = await prisma.lessonAccess.update({
      where: { userId: sessionUser.id },
      data: {
        completedLessons: lessonNumber,
        lastCompletedAt: new Date(),
      },
      select: { completedLessons: true },
    });

    const notifyTo = process.env.LESSONS_NOTIFY_EMAIL;
    if (notifyTo) {
      const subject = `AvenEzer School: lesson ${lessonNumber} completed`;
      const html = `
        <div>
          <p><strong>Lesson:</strong> ${lessonNumber}/${totalLessons} (${safe(lessonTitle)})</p>
          <p><strong>User:</strong> ${safe(sessionUser.email)}</p>
        </div>
      `;

      await mailer.sendMail({
        from: getFromEmail(),
        to: notifyTo,
        subject,
        html,
      });
    }

    return NextResponse.json({
      ok: true,
      completedLessons: updated.completedLessons,
      nextLesson: Math.min(lessonNumber + 1, totalLessons),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 },
    );
  }
}
