import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/auth/jwt";

export async function getUserFromCookie() {
  const cookieStore = await cookies(); // <-- важливо
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const payload = verifyAuthToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        telegram: true,
        createdAt: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}
