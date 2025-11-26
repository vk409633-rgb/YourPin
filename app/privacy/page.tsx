import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './privacy.module.css';

export const metadata: Metadata = {
    title: "Privacy Policy - YourPin",
    description: "Learn how YourPin protects your privacy. We don't store your data, track your downloads, or collect personal information. Your privacy is our priority.",
    keywords: ["privacy policy", "data protection", "user privacy", "yourpin privacy"],
    openGraph: {
        title: "Privacy Policy - YourPin",
        description: "Learn how YourPin protects your privacy. We don't store your data or collect personal information.",
    },
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className={styles.privacyPage}>
                <div className="container">
                    <article className={styles.content}>
                        <header className={styles.header}>
                            <h1>Privacy Policy</h1>
                            <p className={styles.lastUpdated}>Last Updated: November 26, 2025</p>
                        </header>

                        <section className={styles.section}>
                            <h2>🔒 Our Commitment to Privacy</h2>
                            <p>
                                At YourPin, we take your privacy seriously. This Privacy Policy explains how we handle your information
                                when you use our Pinterest video downloader and YouTube thumbnail downloader services.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>📊 Information We Collect</h2>

                            <h3>Information You Provide</h3>
                            <ul>
                                <li><strong>URLs</strong>: When you paste a Pinterest or YouTube URL to download content, we process this URL temporarily to fetch the requested media.</li>
                                <li><strong>Session Data</strong>: We use browser session storage to remember your pro feature unlocks for 24 hours.</li>
                            </ul>

                            <h3>Information We Don't Collect</h3>
                            <ul>
                                <li>❌ We do NOT store your download history</li>
                                <li>❌ We do NOT collect personal information (name, email, phone)</li>
                                <li>❌ We do NOT track your browsing activity</li>
                                <li>❌ We do NOT sell your data to third parties</li>
                                <li>❌ We do NOT require account creation or registration</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2>🔐 How We Use Your Information</h2>
                            <p>The URLs you provide are used solely for:</p>
                            <ul>
                                <li>Processing your download request</li>
                                <li>Fetching media from Pinterest or YouTube</li>
                                <li>Delivering the requested content to you</li>
                            </ul>
                            <p>
                                <strong>Important:</strong> All processing happens in real-time. We do not store URLs, downloaded content,
                                or any user data on our servers after your session ends.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>🍪 Cookies and Local Storage</h2>

                            <h3>Session Storage</h3>
                            <p>
                                We use browser session storage to remember your pro feature unlocks. This data:
                            </p>
                            <ul>
                                <li>Stays only in your browser</li>
                                <li>Is automatically deleted when you close your browser</li>
                                <li>Is not accessible to us or any third parties</li>
                                <li>Contains only feature unlock timestamps</li>
                            </ul>

                            <h3>Cookies</h3>
                            <p>
                                We do not use cookies for tracking. Any cookies used are strictly for:
                            </p>
                            <ul>
                                <li>Essential website functionality</li>
                                <li>Remembering your preferences</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2>📢 Third-Party Services</h2>

                            <h3>Content Sources</h3>
                            <p>
                                When you use our service, we fetch content from:
                            </p>
                            <ul>
                                <li><strong>Pinterest</strong>: For video downloads</li>
                                <li><strong>YouTube</strong>: For thumbnail downloads</li>
                            </ul>
                            <p>
                                These platforms have their own privacy policies. We recommend reviewing:
                            </p>
                            <ul>
                                <li><a href="https://policy.pinterest.com/privacy-policy" target="_blank" rel="noopener noreferrer">Pinterest Privacy Policy</a></li>
                                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">YouTube/Google Privacy Policy</a></li>
                            </ul>

                            <h3>Advertising (If Applicable)</h3>
                            <p>
                                If we display advertisements to unlock pro features, third-party ad providers may collect data
                                according to their own privacy policies. We will clearly disclose any ad partners we work with.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>🛡️ Data Security</h2>
                            <p>
                                We implement security measures to protect your information:
                            </p>
                            <ul>
                                <li>HTTPS encryption for all data transmission</li>
                                <li>No permanent storage of user data</li>
                                <li>Secure server infrastructure</li>
                                <li>Regular security updates and monitoring</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2>👶 Children's Privacy</h2>
                            <p>
                                Our service is not directed to children under 13. We do not knowingly collect information from children.
                                If you believe a child has provided us with information, please contact us immediately.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>🌍 International Users</h2>
                            <p>
                                Our service is available globally. By using YourPin, you consent to the transfer and processing
                                of your information as described in this policy, regardless of your location.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>✏️ Changes to This Policy</h2>
                            <p>
                                However, you have the right to:
                            </p>
                            <ul>
                                <li>Stop using our service at any time</li>
                                <li>Clear your browser's session storage</li>
                                <li>Contact us with privacy concerns</li>
                                <li>Request information about our data practices</li>
                            </ul>
                        </section>

                        <div className={styles.summary}>
                            <h3>📋 Summary</h3>
                            <p>
                                <strong>In simple terms:</strong> We don't collect, store, or sell your personal information.
                                We only process URLs temporarily to provide our download service. Your privacy is protected by design.
                            </p>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
