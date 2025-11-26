import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <div className={styles.footerBrand}>
                            <span className={styles.footerLogo}>📌</span>
                            <span className={styles.footerBrandText}>YourPin</span>
                        </div>
                        <p className={styles.footerDescription}>
                            The fastest way to download Pinterest videos and YouTube thumbnails.
                            Free, secure, and easy to use.
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Tools</h3>
                        <nav className={styles.footerLinks}>
                            <Link href="#pinterest" className={styles.footerLink}>
                                Pinterest Downloader
                            </Link>
                            <Link href="#youtube" className={styles.footerLink}>
                                YouTube Thumbnails
                            </Link>
                        </nav>
                    </div>

                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Resources</h3>
                        <nav className={styles.footerLinks}>
                            <Link href="#features" className={styles.footerLink}>
                                Features
                            </Link>
                            <Link href="/about" className={styles.footerLink}>
                                About Us
                            </Link>
                            <Link href="/contact" className={styles.footerLink}>
                                Contact
                            </Link>
                        </nav>
                    </div>

                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Legal</h3>
                        <nav className={styles.footerLinks}>
                            <Link href="/privacy" className={styles.footerLink}>
                                Privacy Policy
                            </Link>
                            <Link href="/contact" className={styles.footerLink}>
                                Terms of Service
                            </Link>
                            <Link href="/contact" className={styles.footerLink}>
                                DMCA
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.footerCopyright}>
                        © {currentYear} YourPin. All rights reserved.
                    </p>
                    <p className={styles.footerDisclaimer}>
                        We are not affiliated with Pinterest or YouTube. All trademarks belong to their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
}
