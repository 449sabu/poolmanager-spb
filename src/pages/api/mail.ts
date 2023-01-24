import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'お問い合わせ',
    text: `
    from : ${req.body.Address}
    name : ${req.body.Name}
    message : ${req.body.Message}
    `,
  });

  res.status(200).json({
    success: true,
  });
};
