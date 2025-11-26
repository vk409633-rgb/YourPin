import type { Metadata } from "next";
import Header from '@/components/Header';
import PinterestDownloader from '@/components/PinterestDownloader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: "Pinterest Video Downloader - Download Pinterest Videos Free",
    description: "Download Pinterest videos in high quality for free. Fast, secure Pinterest video downloader with no registration required. Save Pinterest videos to your device instantly.",
    keywords: ["pinterest video downloader", "download pinterest videos", "pinterest downloader", "save pinterest videos", "pinterest video download free"],
    openGraph: {
        title: "Pinterest Video Downloader - Download Pinterest Videos Free",
        description: "Download Pinterest videos in high quality for free. Fast, secure Pinterest video downloader with no registration required.",
    },
};

export default function PinterestPage() {
    return (
        <>
            <Header />
            <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
                <section className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
                    <article>
                        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h1 style={{
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                marginBottom: '1rem',
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Pinterest Video Downloader
                            </h1>
                            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
                                Download Pinterest videos in the highest quality available
                            </p>
                        </header>

                        <PinterestDownloader />

                        <section style={{ marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                                How to Download Pinterest Videos
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                                Our Pinterest video downloader makes it easy to save your favorite Pinterest videos to your device.
                                Simply copy the Pinterest video URL, paste it into our downloader, and get instant access to high-quality
                                video downloads. No software installation or registration required.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                                Features of Our Pinterest Downloader
                            </h3>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                <li>Download Pinterest videos in original quality</li>
                                <li>Fast and reliable video extraction</li>
                                <li>No watermarks or quality loss</li>
                                <li>Works with all Pinterest video formats</li>
                                <li>Completely free to use</li>
                                <li>No registration or login required</li>
                                <li>Mobile-friendly interface</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                                Why Use YourPin Pinterest Downloader?
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                YourPin is the most reliable Pinterest video downloader available. We prioritize your privacy and security,
                                ensuring that your downloads are processed quickly and safely. Our tool works on all devices and browsers,
                                making it the perfect solution for downloading Pinterest videos on the go.
                            </p>
                        </section>
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}
