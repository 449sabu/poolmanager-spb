import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    // port: 465,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const data = {
    from: req.body.email,
    to: process.env.MAIL_USER,
    subject: `[お問い合わせ] ${req.body.name}様より`,
    text: ``,
    html: `
    <p>from : ${req.body.email}</p>
    <p>name : ${req.body.name}</p>
    <p>subject : ${req.body.subject}</p>
    <p>message : ${req.body.message}</p>
    `,
  };

  await transporter.sendMail(data);

  res.status(200).json({
    success: true,
  });
};
