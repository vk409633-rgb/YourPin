import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className="container">
                    <div className={styles.navContent}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>📌</span>
                            <span className={styles.logoText}>YourPin</span>
                        </Link>

                        <div className={styles.navLinks}>
                            <Link href="#pinterest" className={styles.navLink}>
                                Pinterest Downloader
                            </Link>
                            <Link href="#youtube" className={styles.navLink}>
                                YouTube Thumbnails
                            </Link>
                            <Link href="#features" className={styles.navLink}>
                                Features
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
