import Link from 'next/link'
import client from '../../libs/client'
import styles from '../../styles/Blog.module.scss'

/**
 * URLを動的に生成
 * -getStaticPaths ⇒ returnされているpathsの値がそのままURLのpathになる
 * -fallback:false ⇒ getStaticPathsで定義されていないパスを404で返す
 */
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' })

  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

/**
 * APIのブログデータの中でIDを指定してブログデータを引っ張ってくる
 *  -contentId ⇒ どのブログコンテンツかを指定
 *  -getStaticProps ⇒ ビルド時に一度だけ実行
 *  -blog ⇒ blog[{title:...,body...,・・・},{title:...,・・・}]の形でデータが格納されている
 */
export const getStaticProps = async (context) => {
  const { id } = context.params
  const data = await client.get({ endpoint: 'blog', contentId: id })
  console.log(id)
  console.log(data)

  return {
    props: {
      blog: data,
    },
  }
}

/**
 * ブログデータをブラウザにレンダリング
 *  -blog ⇒ getStaticePropsの戻り値が引数にわたってくる
 *  -dangerouslySetInnerHTML ⇒ html形式でコンテンツを表示※非推奨だが、入力はcmsからしか行われないためOK
 */
export default function BlogId({ blog }) {
  console.log(blog)
  return (
    <main id="top" className={styles.main}>
      <section>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.headInfo}>
          <div className={styles.flowNavi}>
            <Link href="/">
              <span>記事一覧</span>
            </Link>
            <span>&gt;&gt;</span>
            <span>{blog.title}(本記事)</span>
          </div>
          <div className={styles.time}>
            <p className={styles.updatedAt}>最終更新日:{blog.updatedAt}</p>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          {blog.category.map((category) => {
            return (
              <p key={category.id} className={`category ${category.name}`}>
                {category.name}
              </p>
            )
          })}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          className={styles.post}
        />
      </section>

      <Link href="/" className={styles.bottomLink}>
        記事一覧に戻る
      </Link>

      <Link href="#top" className={styles.toTopLink}>
        <div className={styles.pagetopArrow}></div>
      </Link>
    </main>
  )
}
