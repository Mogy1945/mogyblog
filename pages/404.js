import styles from '../styles/404.module.scss';
import Link from "next/link";

export default function Custom404() {
    return (
        <main className={styles.main}>
            <h3>404 - not found -</h3>
            <p>指定されたページが存在しません。<br className={styles.sp} />URLを見直してみてください。</p>

            <Link href="/">
                <span>ホームに戻る</span>
            </Link>
        </main>
    );
}