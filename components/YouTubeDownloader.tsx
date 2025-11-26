'use client';

import { useState } from 'react';
import styles from './YouTubeDownloader.module.css';
import AdModal from './AdModal';
import { useProFeatures } from '@/hooks/useProFeatures';

interface ThumbnailData {
    videoId: string;
    thumbnails: {
        maxres: string;
        sd: string;
        hq: string;
        mq: string;
        default: string;
    };
    videoUrl: string;
}

export default function YouTubeDownloader() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<ThumbnailData | null>(null);

    // Pro features
    const { isFeatureUnlocked, unlockFeature, getTimeRemaining } = useProFeatures();
    const [showAdModal, setShowAdModal] = useState(false);
    const [pendingFeature, setPendingFeature] = useState<string>('');
    const [batchUrls, setBatchUrls] = useState<string>('');
    const [showBatchDownload, setShowBatchDownload] = useState(false);

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        setLoading(true);
        setError('');
        setData(null);

        try {
            const response = await fetch('/api/youtube', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch thumbnails');
            }

            setData(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const downloadThumbnail = (thumbnailUrl: string, quality: string) => {
        const link = document.createElement('a');
        link.href = thumbnailUrl;
        link.download = `youtube-thumbnail-${data?.videoId}-${quality}.jpg`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleProFeature = (featureName: string) => {
        if (isFeatureUnlocked(featureName)) {
            // Feature already unlocked, execute it
            if (featureName === 'Batch Thumbnail Download') {
                setShowBatchDownload(true);
            } else if (featureName === 'Download All Qualities') {
                // Download all qualities at once
                if (data) {
                    downloadThumbnail(data.thumbnails.maxres, 'maxres');
                    setTimeout(() => downloadThumbnail(data.thumbnails.sd, 'sd'), 500);
                    setTimeout(() => downloadThumbnail(data.thumbnails.hq, 'hq'), 1000);
                    setTimeout(() => downloadThumbnail(data.thumbnails.mq, 'mq'), 1500);
                }
            }
        } else {
            // Show ad to unlock
            setPendingFeature(featureName);
            setShowAdModal(true);
        }
    };

    const handleAdComplete = () => {
        unlockFeature(pendingFeature);

        // Execute the feature
        if (pendingFeature === 'Batch Thumbnail Download') {
            setShowBatchDownload(true);
        } else if (pendingFeature === 'Download All Qualities') {
            if (data) {
                downloadThumbnail(data.thumbnails.maxres, 'maxres');
                setTimeout(() => downloadThumbnail(data.thumbnails.sd, 'sd'), 500);
                setTimeout(() => downloadThumbnail(data.thumbnails.hq, 'hq'), 1000);
                setTimeout(() => downloadThumbnail(data.thumbnails.mq, 'mq'), 1500);
            }
        }
    };

    const handleBatchDownload = async () => {
        const urls = batchUrls.split('\n').filter(u => u.trim());
        if (urls.length === 0) {
            setError('Please enter at least one URL');
            return;
        }

        setLoading(true);
        setError('');

        for (const batchUrl of urls) {
            try {
                const response = await fetch('/api/youtube', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: batchUrl.trim() }),
                });

                const result = await response.json();
                if (response.ok && result.data.thumbnails.maxres) {
                    downloadThumbnail(result.data.thumbnails.maxres, `batch-${result.data.videoId}`);
                }
            } catch (err) {
                console.error('Batch download error:', err);
            }
        }

        setLoading(false);
        setBatchUrls('');
        setShowBatchDownload(false);
    };

    return (
        <>
            <article id="youtube" className="card">
                <div className={styles.toolHeader}>
                    <div className={styles.toolIcon}>🎬</div>
                    <div>
                        <h2 className={styles.toolTitle}>YouTube Thumbnail Downloader</h2>
                        <p className={styles.toolSubtitle}>Get YouTube video thumbnails in all qualities</p>
                    </div>
                </div>

                {/* Pro Features Banner */}
                <div className={styles.proFeaturesBanner}>
                    <div className={styles.proFeatureItem}>
                        <button
                            onClick={() => handleProFeature('Batch Thumbnail Download')}
                            className={`btn ${isFeatureUnlocked('Batch Thumbnail Download') ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            <span>⚡</span>
                            {isFeatureUnlocked('Batch Thumbnail Download') ? (
                                <>Batch Download (Active {getTimeRemaining('Batch Thumbnail Download')}m)</>
                            ) : (
                                <>Batch Download (Pro)</>
                            )}
                        </button>
                    </div>
                    <div className={styles.proFeatureItem}>
                        <button
                            onClick={() => handleProFeature('Download All Qualities')}
                            className={`btn ${isFeatureUnlocked('Download All Qualities') ? 'btn-primary' : 'btn-secondary'}`}
                            disabled={!data}
                        >
                            <span>💎</span>
                            {isFeatureUnlocked('Download All Qualities') ? (
                                <>All Qualities (Active {getTimeRemaining('Download All Qualities')}m)</>
                            ) : (
                                <>All Qualities (Pro)</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Batch Download Section */}
                {showBatchDownload && isFeatureUnlocked('Batch Thumbnail Download') && (
                    <div className={styles.batchSection}>
                        <h3 className={styles.batchTitle}>🚀 Batch Thumbnail Download</h3>
                        <p className={styles.batchDescription}>
                            Enter multiple YouTube URLs (one per line) to download all thumbnails at once
                        </p>
                        <textarea
                            className={styles.batchTextarea}
                            placeholder="https://www.youtube.com/watch?v=...&#10;https://www.youtube.com/watch?v=...&#10;https://youtu.be/..."
                            value={batchUrls}
                            onChange={(e) => setBatchUrls(e.target.value)}
                            rows={5}
                        />
                        <div className={styles.batchButtons}>
                            <button
                                onClick={handleBatchDownload}
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Download All Thumbnails'}
                            </button>
                            <button
                                onClick={() => setShowBatchDownload(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleFetch} className={styles.form}>
                    <div className="input-group">
                        <label htmlFor="youtube-url" className="input-label">
                            YouTube URL
                        </label>
                        <input
                            id="youtube-url"
                            type="text"
                            className="input-field"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className={styles.error} role="alert">
                            <span className={styles.errorIcon}>⚠️</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%' }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span>🔍</span>
                                Get Thumbnails
                            </>
                        )}
                    </button>
                </form>

                {data && (
                    <div className={styles.result}>
                        <div className={styles.resultHeader}>
                            <h3 className={styles.resultTitle}>Thumbnails Ready!</h3>
                        </div>

                        <div className={styles.thumbnailGrid}>
                            {[
                                { key: 'maxres', label: 'Max Resolution', url: data.thumbnails.maxres },
                                { key: 'sd', label: 'Standard Definition', url: data.thumbnails.sd },
                                { key: 'hq', label: 'High Quality', url: data.thumbnails.hq },
                                { key: 'mq', label: 'Medium Quality', url: data.thumbnails.mq },
                            ].map((thumb) => (
                                <div key={thumb.key} className={styles.thumbnailCard}>
                                    <div className={styles.thumbnailPreview}>
                                        <img
                                            src={thumb.url}
                                            alt={`${thumb.label} thumbnail`}
                                            className={styles.thumbnailImage}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className={styles.thumbnailInfo}>
                                        <div className={styles.thumbnailLabel}>{thumb.label}</div>
                                        <button
                                            onClick={() => downloadThumbnail(thumb.url, thumb.key)}
                                            className="btn btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            <span>⬇️</span>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.videoLink}>
                            <a
                                href={data.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <span>▶️</span>
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                )}

                <div className={styles.instructions}>
                    <h4 className={styles.instructionsTitle}>How to use:</h4>
                    <ol className={styles.instructionsList}>
                        <li>Copy any YouTube video URL from your browser</li>
                        <li>Paste it into the input field above</li>
                        <li>Click "Get Thumbnails" to fetch all available qualities</li>
                        <li>Choose your preferred quality and download</li>
                        <li>🎁 <strong>Pro Tip:</strong> Watch a short ad to unlock batch downloads and download all qualities at once!</li>
                    </ol>
                </div>
            </article>

            <AdModal
                isOpen={showAdModal}
                onClose={() => setShowAdModal(false)}
                onAdComplete={handleAdComplete}
                featureName={pendingFeature}
            />
        </>
    );
}
