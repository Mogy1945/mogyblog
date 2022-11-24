import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/About.module.scss'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Mogy-Blog</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h3>About</h3>
        <div className={styles.profileContainer}>
          <div className={styles.profileInfo}>
            <Image
              src="/vercel.svg"
              alt="プロフィール画像"
              width={500}
              height={200}
            />
          </div>
          <div className={styles.profileText}>
            <p className={styles.profileHead}>Profile</p>
            <div className={styles.profileBox}>
              <p className={styles.title}>Name</p>
              <p className={styles.text}>Mogy</p>
            </div>
            <div className={styles.profileBox}>
              <p className={styles.title}>Age</p>
              <p className={styles.text}>28</p>
            </div>
            <div className={styles.profileBox}>
              <p className={styles.title}>Address</p>
              <p className={styles.text}>Miyazaki City</p>
            </div>
            <div className={styles.profileBox}>
              <p className={styles.title}>Hobby</p>
              <p className={styles.text}>Game</p>
            </div>

            <p className={styles.profileHead}>History</p>
            <div className={styles.profileBox}>
              <p className={styles.historyText}>
                1994/09/28 生誕。宮崎県都城市出身。
                <br />
                SaaS企業で自社システムのフロントエンジニアとして勤務。
                <br />
                利用スキルは、HTML、CSS、jQuery。
                <br />
                <br />
                都城市立泉ヶ丘高校を留年、留年から1年後に中退。
                <br />
                その後、高等学校卒業程度認定試験を取得し、宮崎公立大学に入学。
                <br />
                <br />
                新卒で団体職員の総務に就職。
                <br />
                1年8カ月勤めるも、将来のスキル不安を感じ退職を決意。
                <br />
                <br />
                ハローワークでWEB系の職業訓練校のチラシを見て、職業訓練校に入学。
                半年間、illustrator、Photoshop、コーディングの勉強を行う。
                <br />
                <br />
                卒業後、現SaaS企業に入社。
                <br />
                自社システムを用いてWEBサイトを制作しています。（2022/11で2年経過）
                <br />
                <br />
                個人的に色々勉強中。
                <br />
                触っているもの ⇒ SCSS、TestCafe、React、Next.js、microCMS...
                <br />
                学んでいきたいもの ⇒ React、Next.js、TypeScript、Tailwind.css
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
