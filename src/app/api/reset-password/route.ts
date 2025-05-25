import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 6) {
      return Response.json({ message: "Mot de passe invalide." }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });

    if (!user) {
      return Response.json({ message: "Token invalide ou expiré." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return Response.json({ message: "Mot de passe mis à jour." });
  } catch (error) {
    console.error("Erreur dans l'API reset-password:", error);
    return Response.json({ message: "Erreur serveur." }, { status: 500 });
  }
}
