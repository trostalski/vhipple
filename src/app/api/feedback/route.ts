import { FeedBackInput } from "@/app/components/FeedbackButton";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type EmailPayload = {
  from: string;
  subject: string;
  text: string;
};

const smtpOptions = {
  host: process.env.SMTP_HOST || "",
  port: parseInt(process.env.SMTP_PORT || ""),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
};

const createEmailMessage = (data: FeedBackInput) => {
  const email = data.email;
  const comment = data.comment;
  const nameString = data.name || "Name: Not provided";
  const ratingString = data.rating || "Rating: Not provided";
  return `Name: ${nameString}\nEmail: ${email}\nRating: ${ratingString}\nComment: ${comment}`;
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

export async function POST(req: Request, res: NextApiResponse) {
  const body: FeedBackInput = await req.json();
  await sendEmail({
    from: process.env.SMTP_FROM_EMAIL || "",
    subject: "Feedback from " + body.email,
    text: createEmailMessage(body),
  });
  res.status(200);
}
