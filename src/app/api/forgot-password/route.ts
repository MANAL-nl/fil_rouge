import { prisma } from "../../../lib/prisma";
import { sendEmail } from "../../../lib/mailer";
import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      console.log("Email manquant ou invalide :", email);
      return Response.json({ message: "Email invalide." }, { status: 400 });
    }

    console.log("Recherche utilisateur avec email :", email);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("Aucun utilisateur trouvé pour cet email.");
      return Response.json({ message: "Si cet email existe, un lien a été envoyé." });
    }

    const token = uuidv4();
    const expiry = addMinutes(new Date(), 15);

    console.log("Token généré :", token);
    console.log("Expiration fixée à :", expiry);

    try {
      await prisma.user.update({
        where: { email },
        data: {
          resetToken: token,
          resetTokenExpiry: expiry,
        },
      });
      console.log("Token et date d'expiration enregistrés pour l'utilisateur.");
    } catch (dbError) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", dbError);
      return Response.json({ message: "Erreur base de données." }, { status: 500 });
    }

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    console.log("Lien de réinitialisation :", resetLink);

    try {
      await sendEmail(
        email,
        "Réinitialisation du mot de passe",
        `Bonjour,\n\nCliquez sur ce lien pour réinitialiser votre mot de passe :\n${resetLink}\n\nCe lien expirera dans 15 minutes.`
      );
      console.log("Email envoyé à :", email);
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email :", emailError);
      return Response.json({ message: "Erreur lors de l'envoi de l'email." }, { status: 500 });
    }

    return Response.json({ message: "Si cet email existe, un lien a été envoyé." });

  } catch (error: any) {
    console.error("Erreur générale dans forgot-password:", error.message, error.stack);
    return Response.json({ message: "Erreur serveur." }, { status: 500 });
  }
}
