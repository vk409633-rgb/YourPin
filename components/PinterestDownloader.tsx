'use client';

import { useState } from 'react';
import styles from './PinterestDownloader.module.css';
import AdModal from './AdModal';
import { useProFeatures } from '@/hooks/useProFeatures';

interface PinterestData {
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
    pinId: string;
}

export default function PinterestDownloader() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<PinterestData | null>(null);

    // Pro features
    const { isFeatureUnlocked, unlockFeature, getTimeRemaining } = useProFeatures();
    const [showAdModal, setShowAdModal] = useState(false);
    const [pendingFeature, setPendingFeature] = useState<string>('');
    const [batchUrls, setBatchUrls] = useState<string>('');
    const [showBatchDownload, setShowBatchDownload] = useState(false);

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError('Please enter a Pinterest URL');
            return;
        }

        setLoading(true);
        setError('');
        setData(null);

        try {
            const response = await fetch('/api/pinterest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch video');
            }

            setData(result.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = (fileUrl: string, filename: string) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleProFeature = (featureName: string) => {
        if (isFeatureUnlocked(featureName)) {
            // Feature already unlocked, execute it
            if (featureName === 'Batch Download') {
                setShowBatchDownload(true);
            } else if (featureName === 'HD Quality') {
                // HD download logic here
                if (data?.videoUrl) {
                    downloadFile(data.videoUrl, `pinterest-hd-${data.pinId}.mp4`);
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
        if (pendingFeature === 'Batch Download') {
            setShowBatchDownload(true);
        } else if (pendingFeature === 'HD Quality') {
            if (data?.videoUrl) {
                downloadFile(data.videoUrl, `pinterest-hd-${data.pinId}.mp4`);
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
                const response = await fetch('/api/pinterest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: batchUrl.trim() }),
                });

                const result = await response.json();
                if (response.ok && result.data.videoUrl) {
                    downloadFile(result.data.videoUrl, `pinterest-batch-${result.data.pinId}.mp4`);
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
            <article id="pinterest" className="card">
                <div className={styles.toolHeader}>
                    <div className={styles.toolIcon}>📌</div>
                    <div>
                        <h2 className={styles.toolTitle}>Pinterest Video Downloader</h2>
                        <p className={styles.toolSubtitle}>Download Pinterest videos in high quality</p>
                    </div>
                </div>

                {/* Pro Features Banner */}
                <div className={styles.proFeaturesBanner}>
                    <div className={styles.proFeatureItem}>
                        <button
                            onClick={() => handleProFeature('Batch Download')}
                            className={`btn ${isFeatureUnlocked('Batch Download') ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            <span>⚡</span>
                            {isFeatureUnlocked('Batch Download') ? (
                                <>Batch Download (Active {getTimeRemaining('Batch Download')}m)</>
                            ) : (
                                <>Batch Download (Pro)</>
                            )}
                        </button>
                    </div>
                    <div className={styles.proFeatureItem}>
                        <button
                            onClick={() => handleProFeature('HD Quality')}
                            className={`btn ${isFeatureUnlocked('HD Quality') ? 'btn-primary' : 'btn-secondary'}`}
                            disabled={!data}
                        >
                            <span>💎</span>
                            {isFeatureUnlocked('HD Quality') ? (
                                <>HD Quality (Active {getTimeRemaining('HD Quality')}m)</>
                            ) : (
                                <>HD Quality (Pro)</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Batch Download Section */}
                {showBatchDownload && isFeatureUnlocked('Batch Download') && (
                    <div className={styles.batchSection}>
                        <h3 className={styles.batchTitle}>🚀 Batch Download</h3>
                        <p className={styles.batchDescription}>
                            Enter multiple Pinterest URLs (one per line) to download them all at once
                        </p>
                        <textarea
                            className={styles.batchTextarea}
                            placeholder="https://www.pinterest.com/pin/123...&#10;https://www.pinterest.com/pin/456...&#10;https://www.pinterest.com/pin/789..."
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
                                {loading ? 'Processing...' : 'Download All'}
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

                <form onSubmit={handleDownload} className={styles.form}>
                    <div className="input-group">
                        <label htmlFor="pinterest-url" className="input-label">
                            Pinterest URL
                        </label>
                        <input
                            id="pinterest-url"
                            type="text"
                            className="input-field"
                            placeholder="https://www.pinterest.com/pin/..."
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
                                Get Video
                            </>
                        )}
                    </button>
                </form>

                {data && (
                    <div className={styles.result}>
                        <div className={styles.resultHeader}>
                            <h3 className={styles.resultTitle}>Download Ready!</h3>
                        </div>

                        {data.videoUrl && (
                            <div className={styles.preview}>
                                <video
                                    src={data.videoUrl}
                                    controls
                                    className={styles.video}
                                    poster={data.thumbnailUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {data.title && (
                            <div className={styles.metadata}>
                                <h4 className={styles.metadataTitle}>{data.title}</h4>
                                {data.description && (
                                    <p className={styles.metadataDescription}>{data.description}</p>
                                )}
                            </div>
                        )}

                        <div className={styles.downloadButtons}>
                            {data.videoUrl && (
                                <button
                                    onClick={() => downloadFile(data.videoUrl, `pinterest-video-${data.pinId}.mp4`)}
                                    className="btn btn-primary"
                                >
                                    <span>⬇️</span>
                                    Download Video
                                </button>
                            )}
                            {data.thumbnailUrl && (
                                <button
                                    onClick={() => downloadFile(data.thumbnailUrl, `pinterest-thumbnail-${data.pinId}.jpg`)}
                                    className="btn btn-secondary"
                                >
                                    <span>🖼️</span>
                                    Download Thumbnail
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className={styles.instructions}>
                    <h4 className={styles.instructionsTitle}>How to use:</h4>
                    <ol className={styles.instructionsList}>
                        <li>Copy the Pinterest video URL from your browser</li>
                        <li>Paste it into the input field above</li>
                        <li>Click "Get Video" to fetch the download links</li>
                        <li>Download your video in high quality</li>
                        <li>🎁 <strong>Pro Tip:</strong> Watch a short ad to unlock batch downloads and HD quality!</li>
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
