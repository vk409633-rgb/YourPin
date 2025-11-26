import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Download Pinterest Videos & YouTube Thumbnails
                        <span className={styles.heroTitleAccent}> Instantly</span>
                    </h1>

                    <p className={styles.heroDescription}>
                        The fastest and most reliable way to download high-quality Pinterest videos
                        and YouTube thumbnails. Free, secure, and no registration required.
                    </p>

                    <div className={styles.heroStats}>
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
                    </div>

                    <div className={styles.heroCta}>
                        <a href="#pinterest" className="btn btn-primary">
                            Try Pinterest Downloader
                        </a>
                        <a href="#youtube" className="btn btn-secondary">
                            Try YouTube Thumbnails
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.heroBackground}>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
                <div className={styles.heroCircle}></div>
            </div>
        </section>
    );
}
