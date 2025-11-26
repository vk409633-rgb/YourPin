'use client';

import { useState, useEffect } from 'react';
import styles from './AdModal.module.css';

interface AdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdComplete: () => void;
    featureName: string;
}

export default function AdModal({ isOpen, onClose, onAdComplete, featureName }: AdModalProps) {
    const [countdown, setCountdown] = useState(15);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCountdown(15);
            setCanSkip(false);
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setCanSkip(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    const handleSkip = () => {
        if (canSkip) {
            onAdComplete();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && canSkip && onClose()}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>🎁 Unlock Pro Feature</h3>
                    <p className={styles.modalSubtitle}>Watch this ad to unlock: <strong>{featureName}</strong></p>
                </div>

                <div className={styles.adContainer}>
                    {/* Simulated Ad Content */}
                    <div className={styles.adContent}>
                        <div className={styles.adBanner}>
                            <div className={styles.adIcon}>📢</div>
                            <h4 className={styles.adTitle}>Advertisement</h4>
                        </div>

                        <div className={styles.adBody}>
                            <div className={styles.adAnimation}>
                                <div className={styles.adCircle}></div>
                                <div className={styles.adCircle}></div>
                                <div className={styles.adCircle}></div>
                            </div>

                            <p className={styles.adText}>
                                Thank you for supporting our free service!
                                Your ad will finish in <strong>{countdown}</strong> seconds.
                            </p>

                            <div className={styles.adProgress}>
                                <div
                                    className={styles.adProgressBar}
                                    style={{ width: `${((15 - countdown) / 15) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Simulated Ad Banner */}
                        <div className={styles.adBannerContent}>
                            <div className={styles.adBannerGradient}>
                                <h3>🚀 Premium Tools</h3>
                                <p>Download faster, download better</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    {canSkip ? (
                        <button
                            onClick={handleSkip}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            ✓ Continue to Pro Feature
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            disabled
                            style={{ width: '100%' }}
                        >
                            Please wait {countdown}s...
                        </button>
                    )}
                </div>

                <p className={styles.modalNote}>
                    💡 Pro features are unlocked for 24 hours after watching an ad
                </p>
            </div>
        </div>
    );
}
