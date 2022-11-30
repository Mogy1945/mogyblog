import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/Contact.module.scss'

export default function Form() {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Message, setMessage] = useState('')
  const [modalFlag, setmodalFlag] = useState(false)

  // mail_api setting
  const registerUser = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/send', {
      body: JSON.stringify({
        name: Name,
        email: Email,
        message: Message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    await res.json()
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
        </p>
        <div className={styles.formContainer}>
          <form onSubmit={registerUser}>
            <div className={styles.box}>
              <p className={styles.title}>お名前</p>
              <input
                name="name"
                type="text"
                placeholder="例）山田太郎"
                onBlur={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className={styles.box}>
              <p className={styles.title}>E-mailアドレス</p>
              <input
                name="email"
                type="email"
                placeholder="例）sample@test.co.jp"
                onBlur={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className={styles.box}>
              <p className={styles.title}>お問い合わせ内容</p>
              <textarea
                placeholder="例）どうしてエンジニアになろうと思ったのですか？"
                name="text"
                onBlur={(e) => {
                  setMessage(e.target.value)
                }}
              ></textarea>
            </div>
            <div className={styles.box}>
              <input
                type="submit"
                className={styles.submit}
                value="送信"
                onClick={() => {
                  setmodalFlag(true)
                }}
              />
            </div>
          </form>
        </div>
        {modalFlag ? (
          <>
            <div className={styles.modalContainer}>
              <p className={styles.modalTitle}>Success!</p>
              <p className={styles.modalText}>
                送信しました！返信まで少々お待ちください。
              </p>
              <button
                className={styles.modalButton}
                onClick={() => {
                  setmodalFlag(false)
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
