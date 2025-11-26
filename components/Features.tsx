import styles from './Features.module.css';

const features = [
    {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Download videos and thumbnails in seconds with our optimized servers',
    },
    {
        icon: '🔒',
        title: 'Secure & Private',
        description: 'Your data is never stored. All processing happens in real-time',
    },
    {
        icon: '💎',
        title: 'High Quality',
        description: 'Get the highest quality videos and thumbnails available',
    },
    {
        icon: '🆓',
        title: '100% Free',
        description: 'No subscriptions, no hidden fees. Completely free forever',
    },
    {
        icon: '📱',
        title: 'Mobile Friendly',
        description: 'Works perfectly on all devices - desktop, tablet, and mobile',
    },
    {
        icon: '🚫',
        title: 'No Registration',
        description: 'Start downloading immediately. No sign-up required',
    },
];

export default function Features() {
    return (
        <section id="features" className={styles.features}>
            <div className="container">
                <div className={styles.featuresHeader}>
                    <h2 className={styles.featuresTitle}>
                        Why Choose <span className="text-gradient">YourPin</span>?
                    </h2>
                    <p className={styles.featuresSubtitle}>
                        The most powerful and user-friendly media downloader on the web
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <article
                            key={index}
                            className={styles.featureCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
