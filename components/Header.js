import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li><Link href="/">Blog</Link></li>
                    <li><Link href="/skill-set">Skil-Set</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}