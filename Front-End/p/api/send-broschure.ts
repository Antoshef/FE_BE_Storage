import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    const { email, bcc, html } = req.body;

    try {
      let transporter = nodemailer.createTransport({
        host: process.env.IMAP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SALES_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SALES_EMAIL,
        to: email,
        bcc: bcc,
        subject: "Your Invoice",
        text: "This is the plain text version of the email content.",
        html,
      });

      res.json({ message: "Mail Broschure sent!" });
    } catch (error) {
      console.error("Error in sending a broschure:", error);
      res.status(500).json({ message: "Error sending a broschure." });
    }
  }
}
