import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Contact.module.scss'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    msg: '',
  })

  const [focusNameFlag, setFocusNameFlag] = useState('')
  const [focusEmailFlag, setFocusEmailFlag] = useState('')
  const [focusCommentFlag, setFocusCommentFlag] = useState('')

  const [modalFlag, setmodalFlag] = useState(false)
  const [modalOKFlag, setmodalOKFlag] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        msg: form.msg,
      }),
    })
      .then((res) => {
        console.log('Response received')
        setmodalFlag(true)
        if (res.status === 200) {
          console.log('Response succeeded!')
          setmodalOKFlag(true)
        } else {
          console.log(`Error: Status Code ${res.status}`)
          setmodalOKFlag(false)
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`)
      })
  }

  return (
    <>
      <Head>
        <title>Contact | Mogy-Blog</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h3>Contact</h3>
        <p>
          お問い合わせの際は、以下項目を記入し、「送信」ボタンを押してください。
          <br />
          -SendGrid
        </p>
        <div className={styles.formContainer}>
          <form>
            <input
              onChange={(e) => {
                const val = e.currentTarget.value
                setForm((props) => ({
                  ...props,
                  name: val !== null ? val : '',
                }))
              }}
              onFocus={() => {
                setFocusNameFlag(`focused`)
              }}
              onBlur={() => {
                setFocusNameFlag('')
              }}
              value={form.name}
              name="name"
              type="text"
              className={focusNameFlag}
              placeholder="お名前"
            />
            <input
              onChange={(e) => {
                const val = e.currentTarget.value
                setForm((props) => ({
                  ...props,
                  email: val !== null ? val : '',
                }))
              }}
              onFocus={() => {
                setFocusEmailFlag(`focused`)
              }}
              onBlur={() => {
                setFocusEmailFlag('')
              }}
              name="email"
              type="text"
              className={focusEmailFlag}
              placeholder="メールアドレス"
            />
            <textarea
              onChange={(e) => {
                const val = e.currentTarget.value
                setForm((props) => ({
                  ...props,
                  msg: val !== null ? val : '',
                }))
              }}
              onFocus={() => {
                setFocusCommentFlag(`focused`)
              }}
              onBlur={() => {
                setFocusCommentFlag('')
              }}
              name="text"
              className={focusCommentFlag}
              placeholder="お問い合わせ内容"
            ></textarea>
            <input
              className={styles.submit}
              onClick={async (e) => {
                await handleSubmit(e)
              }}
              type="submit"
              value="送信"
            />
          </form>
        </div>
        {modalFlag ? (
          <>
            <div className={styles.modalContainer}>
              <p className={styles.modalTitle}>
                {modalOKFlag ? 'Success!' : 'NG'}
              </p>
              {modalOKFlag ? (
                <p className={styles.modalText}>
                  送信しました！返信まで少々お待ちください。
                </p>
              ) : (
                <p className={styles.modalText}>
                  送信に失敗しました。全ての項目に記入しているか、
                  <br className={styles.pc} />
                  メールアドレスに間違いはないか、今一度ご確認をお願いいたします。
                </p>
              )}
              <button
                className={styles.modalButton}
                onClick={() => {
                  setmodalFlag(false)
                  setmodalOKFlag(false)
                }}
              >
                閉じる
              </button>
            </div>
            <div className={styles.modalBg}></div>
          </>
        ) : (
          ''
        )}
      </main>
    </>
  )
}

export default Contact
