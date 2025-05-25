import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      throw new Error("EMAIL_USER ou EMAIL_PASS n'est pas défini dans .env");
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
}
