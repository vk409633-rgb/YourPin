'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AdaptiveAdUnit.module.css';

interface AdaptiveAdUnitProps {
    /**
     * Placement strategy: 
     * - 'auto': Browser chooses best placement
     * - 'content': Within content flow
     * - 'sidebar': Sticky sidebar placement
     * - 'footer': Bottom of page
     */
    placement?: 'auto' | 'content' | 'sidebar' | 'footer';

    /**
     * Minimum viewport width to show ad (prevents mobile clutter)
     */
    minWidth?: number;

    /**
     * Custom class name for additional styling
     */
    className?: string;

    /**
     * Ad slot ID (optional, uses default if not provided)
     */
    adSlot?: string;

    /**
     * Enable lazy loading (loads ad only when near viewport)
     */
    lazyLoad?: boolean;

    /**
     * Margin from viewport before lazy loading (in pixels)
     */
    lazyLoadMargin?: number;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdaptiveAdUnit({
    placement = 'auto',
    minWidth = 0,
    className = '',
    adSlot = '2146228323',
    lazyLoad = true,
    lazyLoadMargin = 200
}: AdaptiveAdUnitProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(!lazyLoad);
    const [adLoaded, setAdLoaded] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    // Check viewport width
    useEffect(() => {
        const checkViewport = () => {
            if (window.innerWidth < minWidth) {
                setShouldRender(false);
            } else {
                setShouldRender(true);
            }
        };

        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, [minWidth]);

    // Lazy loading with Intersection Observer
    useEffect(() => {
        if (!lazyLoad || !adRef.current || isVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: `${lazyLoadMargin}px`
            }
        );

        observer.observe(adRef.current);

        return () => observer.disconnect();
    }, [lazyLoad, lazyLoadMargin, isVisible]);

    // Initialize ad when visible
    useEffect(() => {
        if (!isVisible || adLoaded || !shouldRender) return;

        const loadAd = () => {
            try {
                // Ensure adsbygoogle is available
                if (typeof window !== 'undefined') {
                    window.adsbygoogle = window.adsbygoogle || [];

                    // Small delay to ensure DOM is ready
                    setTimeout(() => {
                        try {
                            window.adsbygoogle.push({});
                            setAdLoaded(true);
                        } catch (error) {
                            console.warn('AdSense initialization delayed:', error);
                        }
                    }, 100);
                }
            } catch (error) {
                console.error('Error loading ad:', error);
            }
        };

        loadAd();
    }, [isVisible, adLoaded, shouldRender]);

    if (!shouldRender) return null;

    const placementClass = styles[`placement-${placement}`] || styles['placement-auto'];

    return (
        <div
            ref={adRef}
            className={`${styles.adContainer} ${placementClass} ${className}`}
            data-ad-placement={placement}
        >
            {/* Reserve space to prevent layout shift */}
            <div className={styles.adReservedSpace}>
                {isVisible && (
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-7431808618156384"
                        data-ad-slot={adSlot}
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                )}
            </div>

            {/* Optional loading placeholder */}
            {!adLoaded && isVisible && (
                <div className={styles.adPlaceholder}>
                    <span className={styles.adLabel}>Advertisement</span>
                </div>
            )}
        </div>
    );
}
