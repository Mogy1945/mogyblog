const sgMail = require('@sendgrid/mail')

const apiKey = process.env.NEXT_PUBLIC_MAIL_API

export default function handler(req, res) {
  if (req.method === 'POST') {
    sgMail.setApiKey(apiKey)

    const Name = req.body.name

    const msg = {
      to: req.body.email,
      from: 'hatano14150@gmail.com',
      subject: '【Mogy Blog】お問合せを受け付けました。',
      text: `
      お問合せを受け付けました。

      ${Name} 様 
      お問合せいただきありがとうございます。
      回答まで暫くお待ちください。

      【お問合せ内容】
      ${req.body.message}
      ----------------------------
      Name: Mogy
      Twitter: @test
      ----------------------------
      `,
      // html: `<h4>お問合せを受け付けました</h4>
      // <p>
      // ${Name} 様
      // </p>
      // <p>
      // お問合せいただきありがとうございます。
      // <br />
      // 回答まで暫くお待ちください。
      // </p>
      // <p>
      // 【お問合せ内容】
      // <br />
      // ${req.body.message}
      // </p>
      // <hr>
      // <p>
      // Name   : Mogy
      // </p>
      // <p>
      // Twitter: @test
      // </p>
      // <hr>
      // `,
    }
    ;(async () => {
      try {
        console.log('success')
        await sgMail.send(msg)
      } catch (error) {
        console.error(error)
        console.log('failer')
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })()
  }

  res.status(200)
}
