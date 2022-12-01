import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import client from '../libs/client'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'

/**
 * APIからブログデータを引っ張ってくる
 *  -client ⇒ libs/client.jsでAPIを指定しブログデータを取得
 *  -getStaticProps ⇒ ビルド時に一度だけ実行※microCMS投稿時に再ビルドされるのでSSGでOK
 *  -blog ⇒ blog[{title:...,body...,・・・},{title:...,・・・}]の形でデータが格納されている
 */
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' })
  const categoryData = await client.get({ endpoint: 'categories' })
  const jsonData = JSON.parse(JSON.stringify(categoryData))
  return {
    props: {
      blog: data.contents,
      category: jsonData,
    },
  }
}

/**
 * ブログデータをブラウザにレンダリング
 *  -blog ⇒ getStaticePropsの戻り値が引数にわたってくる
 */
export default function Home({ blog, category }) {
  const [modalFlag, setModalFlag] = useState(false)
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
            【サイト利用技術・サービス】Next.js、SSR、SSG、SCSS、microCMS、Formspree、Vercel
          </p>
          <p
            className={styles.searchBtn}
            onClick={() => {
              setModalFlag(true)
            }}
          >
            <Image
              height={25}
              width={25}
              alt="カテゴリー検索のボタンです"
              src="/search-icon.png"
            />
            カテゴリー検索
          </p>
          <div>
            <h4 className={styles.latest}>Latest</h4>
            <div className={styles.column}>
              <ul className={styles.blogContainer}>
                {blog.map((blogDate) => (
                  <li key={blogDate.id}>
                    <Link
                      href={`/blog/${blogDate.id}`}
                      className={styles.linkBox}
                    >
                      <div className={styles.blogLeft}>
                        {blogDate.sumbnail !== null ? (
                          <Image
                            height={300}
                            width={300}
                            alt="サムネイル画像です"
                            src={blogDate.sumbnail.path.url}
                          />
                        ) : (
                          <Image
                            height={300}
                            width={300}
                            alt="サムネイル画像です"
                            src="https://source.unsplash.com/random"
                          />
                        )}
                      </div>
                      <div className={styles.blogRight}>
                        <p className={styles.blogRightTitle}>
                          {blogDate.title}
                        </p>
                        <p className={styles.blogRightDetail}>
                          {blogDate.detail}
                        </p>
                        <p className={styles.blogRightDate}>
                          {blogDate.publishedAt}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* PC */}
              <div className={styles.categoryContainer2}>
                <ul className={styles.categoryListContainer}>
                  {category.contents.map((categoryDate) => (
                    <li key={categoryDate.id}>
                      <Link href={`/category/${categoryDate.id}`}>
                        <span>{categoryDate.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* SP */}
              {modalFlag ? (
                <div className={styles.categoryContainer}>
                  <ul className={styles.categoryListContainer}>
                    <div
                      className={styles.closeBtnContainer}
                      onClick={() => {
                        setModalFlag(false)
                      }}
                    >
                      <span className={styles.closeBtn}></span>
                    </div>
                    {category.contents.map((categoryDate) => (
                      <li key={categoryDate.id}>
                        <Link href={`/category/${categoryDate.id}`}>
                          <span>{categoryDate.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
