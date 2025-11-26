import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './about.module.css';

export const metadata: Metadata = {
    title: "About Us - YourPin",
    description: "Learn about YourPin, the free and easy-to-use Pinterest video and YouTube thumbnail downloader. Our mission is to provide fast, secure, and reliable media downloading tools.",
    keywords: ["about yourpin", "about us", "media downloader", "our mission"],
    openGraph: {
        title: "About Us - YourPin",
        description: "Learn about YourPin and our mission to provide the best media downloading experience.",
    },
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className={styles.aboutPage}>
                <div className="container">
                    <article className={styles.content}>
                        <header className={styles.header}>
                            <div className={styles.logo}>📌</div>
                            <h1>About YourPin</h1>
                            <p className={styles.tagline}>Your trusted media downloading companion</p>
                        </header>

                        <section className={styles.section}>
                            <h2>🎯 Our Mission</h2>
                            <p>
                                YourPin was created with a simple mission: to provide a <strong>fast, free, and secure</strong> way
                                to download Pinterest videos and YouTube thumbnails. We believe that accessing media content should
                                be straightforward, without complicated steps or hidden fees.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>💡 Why YourPin?</h2>
                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>⚡</div>
                                    <h3>Lightning Fast</h3>
                                    <p>Our optimized servers ensure quick downloads without long wait times.</p>
                                </div>
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>🔒</div>
                                    <h3>Secure & Private</h3>
                                    <p>We don't store your data. All processing happens in real-time.</p>
                                </div>
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>💎</div>
                                    <h3>High Quality</h3>
                                    <p>Download videos and thumbnails in the best quality available.</p>
                                </div>
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>🆓</div>
                                    <h3>100% Free</h3>
                                    <p>No subscriptions, no hidden costs. Completely free forever.</p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>🚀 What We Offer</h2>

                            <div className={styles.offering}>
                                <h3>📌 Pinterest Video Downloader</h3>
                                <ul>
                                    <li>Download Pinterest videos in high quality</li>
                                    <li>Extract video thumbnails</li>
                                    <li>Batch download multiple videos (Pro)</li>
                                    <li>HD quality downloads (Pro)</li>
                                    <li>Support for all Pinterest video formats</li>
                                </ul>
                            </div>

                            <div className={styles.offering}>
                                <h3>🎬 YouTube Thumbnail Downloader</h3>
                                <ul>
                                    <li>Download thumbnails in 4 different qualities</li>
                                    <li>Max Resolution (1920x1080)</li>
                                    <li>Standard, High, and Medium quality options</li>
                                    <li>Batch thumbnail downloads (Pro)</li>
                                    <li>Download all qualities at once (Pro)</li>
                                </ul>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>🎁 Pro Features</h2>
                            <p>
                                We offer premium features that can be unlocked by watching a short advertisement.
                                This allows us to keep the basic service free while providing advanced functionality:
                            </p>
                            <ul>
                                <li><strong>Batch Downloads</strong>: Download multiple videos or thumbnails at once</li>
                                <li><strong>HD Quality</strong>: Access the highest quality downloads</li>
                                <li><strong>All Qualities</strong>: Download all thumbnail sizes simultaneously</li>
                                <li><strong>24-Hour Access</strong>: Once unlocked, use pro features for 24 hours</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2>🌟 Our Values</h2>
                            <div className={styles.values}>
                                <div className={styles.value}>
                                    <h3>Transparency</h3>
                                    <p>We're open about how we operate and what data we collect (spoiler: very little).</p>
                                </div>
                                <div className={styles.value}>
                                    <h3>User Privacy</h3>
                                    <p>Your privacy is paramount. We don't track, store, or sell your information.</p>
                                </div>
                                <div className={styles.value}>
                                    <h3>Quality Service</h3>
                                    <p>We're committed to providing reliable, high-quality downloads every time.</p>
                                </div>
                                <div className={styles.value}>
                                    <h3>Accessibility</h3>
                                    <p>Our service works on all devices and requires no registration or login.</p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>🛠️ Technology</h2>
                            <p>
                                YourPin is built with modern web technologies to ensure the best user experience:
                            </p>
                            <ul>
                                <li><strong>Next.js</strong>: For fast, server-side rendered pages</li>
                                <li><strong>TypeScript</strong>: For reliable, type-safe code</li>
                                <li><strong>Responsive Design</strong>: Works perfectly on mobile, tablet, and desktop</li>
                                <li><strong>SEO Optimized</strong>: Easy to find through search engines</li>
                                <li><strong>Secure Infrastructure</strong>: HTTPS encryption and secure servers</li>
                            </ul>
                        </section>

                        <section className={styles.section}>
                            <h2>📊 By the Numbers</h2>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>1M+</div>
                                    <div className={styles.statLabel}>Downloads</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>100%</div>
                                    <div className={styles.statLabel}>Free</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>24/7</div>
                                    <div className={styles.statLabel}>Available</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>0</div>
                                    <div className={styles.statLabel}>Data Stored</div>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>🤝 Legal & Compliance</h2>
                            <p>
                                YourPin is a tool for personal use. We respect intellectual property rights and encourage
                                users to:
                            </p>
                            <ul>
                                <li>Only download content you have permission to use</li>
                                <li>Respect copyright laws and terms of service</li>
                                <li>Use downloaded content responsibly</li>
                            </ul>
                            <p>
                                <strong>Disclaimer:</strong> We are not affiliated with Pinterest or YouTube. All trademarks
                                belong to their respective owners.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>📧 Get in Touch</h2>
                            <p>
                                We love hearing from our users! Whether you have questions, feedback, or suggestions,
                                feel free to reach out:
                            </p>
                            <div className={styles.contact}>
                                <a href="/contact" className="btn btn-primary">
                                    Contact Us
                                </a>
                            </div>
                        </section>

                        <div className={styles.cta}>
                            <h3>Ready to start downloading?</h3>
                            <p>Try YourPin today and experience the easiest way to download media content.</p>
                            <a href="/" className="btn btn-primary">
                                Get Started
                            </a>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
