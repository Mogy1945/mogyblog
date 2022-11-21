import Head from "next/head";
import Link from "next/link";
import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";

/**
 * APIからブログデータを引っ張ってくる
 *  -client ⇒ libs/client.jsでAPIを指定しブログデータを取得
 *  -getStaticProps ⇒ ビルド時に一度だけ実行
 *  -blog ⇒　blog[{title:...,body...,・・・},{title:...,・・・}]の形でデータが格納されている
 */
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

/**
 * ブログデータをブラウザにレンダリング
 *  -blog　⇒ getStaticePropsの戻り値が引数にわたってくる
 */
export default function Home({ blog }) {
  return (
    <>
      <Head>
        <title> トップページ | Mogy-Blog</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <span>{blog.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

