import PinterestDownloader from './PinterestDownloader';
import YouTubeDownloader from './YouTubeDownloader';
import styles from './ToolsSection.module.css';

export default function ToolsSection() {
    return (
        <section className={styles.toolsSection}>
            <div className="container">
                <div className={styles.toolsGrid}>
                    <PinterestDownloader />
                    <YouTubeDownloader />
                </div>
            </div>
        </section>
    );
}
