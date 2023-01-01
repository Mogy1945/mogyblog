import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import client from '../../libs/client'
import styles from '../../styles/BlogCategory.module.scss'
import Header from '../../components/Header'

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'categories' })

  const paths = data.contents.map((content) => `/category/${content.id}`)
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const { id } = context.params
  const data = await client.get({
    endpoint: 'blog',
  })

  // IDチェック
  // let flag = false
  let categoryName = ''
  const destData = []
  // eslint-disable-next-line array-callback-return
  data.contents.map((blog) => {
    // eslint-disable-next-line array-callback-return
    blog.category.map((blog2) => {
      if (blog2.id === id) {
        categoryName = blog2.name
        // flag = true
        destData.push(blog)
      }
    })
  })

  return {
    props: {
      blog: destData,
      categoryName,
    },
  }
}

export default function CategoryId({ blog, categoryName }) {
  if (blog.length === 0) {
    return (
      <>
        <Head>
          <title>Category | Mogy-Blog</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <h3>Blog Not Found</h3>
            <p className={styles.categoryDetail}>
              該当のカテゴリに対する記事はございません。
              <br />
              お手数をおかけしますが、下記の「記事一覧に戻る」ボタンを押して、元のページに戻ってください。
            </p>
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
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h3>{categoryName}</h3>
          <p className={styles.categoryDetail}>
            {`「${categoryName}」の記事一覧です。`}
          </p>
          <ul className={styles.blogContainer}>
            {blog.map((blogDate) => (
              <li key={blogDate.id}>
                <Link href={`/blog/${blogDate.id}`} className={styles.linkBox}>
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
                  </div>
                  <div className={styles.blogRight}>
                    <p className={styles.blogRightTitle}>{blogDate.title}</p>
                    <p className={styles.blogRightDetail}>{blogDate.detail}</p>
                    <p className={styles.blogRightDate}>
                      {blogDate.publishedAt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className={styles.bottomLink}>
            記事一覧に戻る
          </Link>

          <Link href="#top" className={styles.toTopLink}>
            <div className={styles.pagetopArrow}></div>
          </Link>
        </div>
      </main>
    </>
  )
}
