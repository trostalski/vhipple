import { FeedBackInput } from "@/app/components/FeedbackButton";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type EmailPayload = {
  from: string;
  subject: string;
  text: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "",
  port: parseInt(process.env.SMTP_PORT || ""),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
};

const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    to: process.env.SMTP_TO_EMAIL,
    ...data,
  });
};

export async function POST(req: Request, res: Response) {
  const body: FeedBackInput = await req.json();
  const message =
    body.name +
    " sent you a message from " +
    body.email +
    " " +
    body.rating +
    " " +
    body.comment;

  await sendEmail({
    from: body.name + " " + body.email,
    subject: "Feedback from " + body.email,
    text: message,
  });
}
