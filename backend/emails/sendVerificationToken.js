import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API);

export const sendVerificationToken = async (res, email, verificationToken) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Use this to login to your account:",
    html: `<strong>${verificationToken}</strong>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
};

//* THE ABOVE CODE WILL NOT WORK, SINCE "RESEND" REQUIRES US TO USE OUR OWN VERIFIED EMAIL TO DELIVER MAILS
