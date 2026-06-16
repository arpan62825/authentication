import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API);

export const sendPasswordResetEmail = async (
  res,
  email,
  token,
  tokenExpiresAt,
) => {
  if (Date.now() > tokenExpiresAt) {
    return res
      .status(400)
      .json({ message: "The password reset token has expired" });
  }

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Use this link to reset password",
    html: `<link>http://localhost:5173/reset-email/${token}</link>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
};
