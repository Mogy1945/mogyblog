import Head from 'next/head'
import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import Link from 'next/link'
import Header from '../components/Header'
import styles from '../styles/Contact.module.scss'

export default function Form() {
  const [state, handleSubmit] = useForm('mdojrabp')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Message, setMessage] = useState('')
  const [errorName, setErrorName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  if (state.succeeded) {
    return (
      <>
        <Head>
          <title>Contact | Mogy-Blog</title>
        </Head>
        <main className={styles.main}>
          <h3>Thank you for your Contact!</h3>
          <p>
            以下の内容でお問合せを完了いたしました。返信までしばらくお待ちください。
          </p>
          <div className={styles.formContainer}>
            <form>
              <div className={styles.box}>
                <p className={styles.titleResult}>お名前</p>
                <p className={styles.result}>{Name}</p>
              </div>
              <div className={styles.box}>
                <p className={styles.titleResult}>E-mailアドレス</p>
                <p className={styles.result}>{Email}</p>
              </div>
              <div className={styles.box}>
                <p className={styles.titleResult}>お問い合わせ内容</p>
                <p className={styles.result}>{Message}</p>
              </div>
            </form>
          </div>
          <Link href="/" className={styles.bottomLink}>
            記事一覧に戻る
          </Link>
        </main>
      </>
    )
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
          お問い合わせの際は、以下項目を
          <span className={styles.notNull}>全て</span>
          記入し、「送信」ボタンを押してください。
        </p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.box}>
              <p className={styles.title}>お名前</p>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="例）山田太郎"
                onBlur={(e) => {
                  const val = e.target.value
                  const valLENGTH = val.length
                  if (valLENGTH > 0) {
                    setErrorName(false)
                    setName(e.target.value)
                  } else {
                    setErrorName(true)
                  }
                }}
              />
              {errorName ? (
                <>
                  <p className={styles.errorText}>
                    ！必ずご入力をお願いいたします。
                  </p>
                </>
              ) : (
                ''
              )}
            </div>
            <div className={styles.box}>
              <p className={styles.title}>E-mailアドレス</p>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="例）sample@test.co.jp"
                onBlur={(e) => {
                  const val = e.target.value
                  const valLENGTH = val.length
                  if (valLENGTH > 0) {
                    setErrorEmail(false)
                    setEmail(e.target.value)
                  } else {
                    setErrorEmail(true)
                  }
                }}
              />
              {errorEmail ? (
                <>
                  <p className={styles.errorText}>
                    ！必ずご入力をお願いいたします。
                  </p>
                </>
              ) : (
                ''
              )}
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div className={styles.box}>
              <p className={styles.title}>お問い合わせ内容</p>
              <textarea
                id="message"
                name="message"
                placeholder="例）どうしてエンジニアになろうと思ったのですか？"
                onBlur={(e) => {
                  const val = e.target.value
                  const valLENGTH = val.length
                  if (valLENGTH > 0) {
                    setErrorMessage(false)
                    setMessage(e.target.value)
                  } else {
                    setErrorMessage(true)
                  }
                }}
              ></textarea>
              {errorMessage ? (
                <>
                  <p className={styles.errorText}>
                    ！必ずご入力をお願いいたします。
                  </p>
                </>
              ) : (
                ''
              )}
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
            <div className={styles.box}>
              <input
                type="submit"
                disabled={
                  errorName || errorEmail || errorMessage ? 'disabled' : ''
                }
                className={styles.submit}
                value="送信"
              />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
