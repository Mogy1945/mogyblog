import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import client from '../libs/client'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'

/**
 * APIからブログデータを引っ張ってくる
 *  -client ⇒ libs/client.jsでAPIを指定しブログデータを取得
 *  -getStaticProps ⇒ ビルド時に一度だけ実行
 *  -blog ⇒ blog[{title:...,body...,・・・},{title:...,・・・}]の形でデータが格納されている
 */
export const getServerSideProps = async () => {
  const data = await client.get({ endpoint: 'blog' })

  return {
    props: {
      blog: data.contents,
    },
  }
}

/**
 * ブログデータをブラウザにレンダリング
 *  -blog ⇒ getStaticePropsの戻り値が引数にわたってくる
 */
export default function Home({ blog }) {
  return (
    <>
      <Head>
        <title>Blog | Mogy-Blog</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h3>Blog</h3>
          <p>
            【サイト利用技術】Next.js、SSR、SCSS、microCMS、nodemailer、Vercel
          </p>
          <div>
            <h4 className={styles.latest}>Latest</h4>
            <ul className={styles.blogContainer}>
              {blog.map((blogDate) => (
                <li key={blogDate.id}>
                  <div className={styles.blogLeft}>
                    {blogDate.sumbnail !== null ? (
                      <Image
                        height={400}
                        width={400}
                        alt="サムネイル画像です"
                        src={blogDate.sumbnail.path.url}
                      />
                    ) : (
                      <Image
                        height={400}
                        width={400}
                        alt="サムネイル画像です"
                        src="https://source.unsplash.com/random"
                      />
                    )}
                    <Link href={`/blog/${blogDate.id}`}></Link>
                  </div>
                  <div className={styles.blogRight}>
                    <p className={styles.blogRightTitle}>{blogDate.title}</p>
                    <p className={styles.blogRightDetail}>{blogDate.detail}</p>
                    <p className={styles.blogRightDate}>{blogDate.publishedAt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
