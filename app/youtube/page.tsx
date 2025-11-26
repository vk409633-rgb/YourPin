import type { Metadata } from "next";
import Header from '@/components/Header';
import YouTubeDownloader from '@/components/YouTubeDownloader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: "YouTube Thumbnail Downloader - Download YouTube Thumbnails HD",
    description: "Download YouTube video thumbnails in all available qualities. Get high-resolution YouTube thumbnails instantly. Free YouTube thumbnail grabber and downloader tool.",
    keywords: ["youtube thumbnail downloader", "download youtube thumbnails", "youtube thumbnail grabber", "youtube thumbnail download", "get youtube thumbnail"],
    openGraph: {
        title: "YouTube Thumbnail Downloader - Download YouTube Thumbnails HD",
        description: "Download YouTube video thumbnails in all available qualities. Get high-resolution YouTube thumbnails instantly.",
    },
};

export default function YouTubePage() {
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
                                background: 'var(--gradient-secondary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                YouTube Thumbnail Downloader
                            </h1>
                            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
                                Download YouTube thumbnails in all available qualities
                            </p>
                        </header>

                        <YouTubeDownloader />

                        <section style={{ marginTop: '3rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                                How to Download YouTube Thumbnails
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                                Our YouTube thumbnail downloader allows you to extract and download thumbnails from any YouTube video
                                in multiple resolutions. Whether you need a thumbnail for your own video, presentation, or design project,
                                our tool provides instant access to all available thumbnail qualities.
                            </p>

                            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                                Available Thumbnail Qualities
                            </h3>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                <li><strong>Max Resolution (1920x1080)</strong> - Highest quality available</li>
                                <li><strong>Standard Definition (640x480)</strong> - Good quality for most uses</li>
                                <li><strong>High Quality (480x360)</strong> - Balanced size and quality</li>
                                <li><strong>Medium Quality (320x180)</strong> - Smaller file size</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                                Why Download YouTube Thumbnails?
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                                YouTube thumbnails are essential for content creators, marketers, and designers. You might need them for:
                            </p>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                <li>Creating video compilations or montages</li>
                                <li>Designing promotional materials</li>
                                <li>Analyzing competitor content strategies</li>
                                <li>Building presentations or reports</li>
                                <li>Archiving video content</li>
                            </ul>

                            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
                                Features
                            </h3>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                <li>Download thumbnails in multiple resolutions</li>
                                <li>Instant thumbnail extraction</li>
                                <li>No quality degradation</li>
                                <li>Works with all YouTube videos</li>
                                <li>100% free with no limitations</li>
                                <li>No software installation needed</li>
                            </ul>
                        </section>
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}
