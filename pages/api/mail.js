import { createTransport } from 'nodemailer'

export default async (req, res) => {
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_USER,
      pass: process.env.NEXT_PUBLIC_MAIL_PASS,
    },
  })

  const data = JSON.parse(req.body)
  await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_MAIL_USER,
    to: data.email,
    subject: '以下の内容でお問い合わせを受け付けました',
    text: `
    名前
    ${data.name}
    
    メールアドレス
    ${data.email}
    
    お問い合わせ内容
    ${data.msg}
    `,
  })

  res.status(200).json({
    success: true,
  })
}
