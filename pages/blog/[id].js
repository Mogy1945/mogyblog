import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss"

/**
 * URLを動的に生成
 * -getStaticPaths ⇒ returnされているpathsの値がそのままURLのpathになる
 * -fallback:false ⇒ getStaticPathsで定義されていないパスを404で返す
 */
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

/**
 * APIのブログデータの中でIDを指定してブログデータを引っ張ってくる
 *  -contentId ⇒ どのブログコンテンツかを指定
 *  -getStaticProps ⇒ ビルド時に一度だけ実行
 *  -blog ⇒　blog[{title:...,body...,・・・},{title:...,・・・}]の形でデータが格納されている
 */
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });
    console.log(id)
    console.log(data)

    return {
        props: {
            blog: data,
        },
    };
};

/**
 * ブログデータをブラウザにレンダリング
 *  -blog　⇒ getStaticePropsの戻り値が引数にわたってくる
 *  -dangerouslySetInnerHTML ⇒ html形式でコンテンツを表示※非推奨だが、入力はcmsからしか行われないためOK
 */
export default function BlogId({ blog }) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            {blog.category.map((category)=>{
                return <p key={category.id} className='category'>{category.name}</p>
            })}
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.body}`,
                }}
                className={styles.post}
            />
        </main>
    );
}

