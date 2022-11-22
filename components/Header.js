import Link from 'next/link'
import styles from './Header.module.scss'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={router.pathname === '/' ? 'current' : ''}>
            <Link href="/">Blog</Link>
          </li>
          <li className={router.pathname === '/About' ? 'current' : ''}>
            <Link href="/About">About</Link>
          </li>
          <li className={router.pathname === '/Contact' ? 'current' : ''}>
            <Link href="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
