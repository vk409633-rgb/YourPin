/**
 * Ad Manager Utility
 * 
 * Provides helper functions for managing adaptive ad placements
 * and determining optimal ad strategies based on page layout.
 */

export interface AdPlacementConfig {
    placement: 'auto' | 'content' | 'sidebar' | 'footer';
    minWidth?: number;
    lazyLoad?: boolean;
    lazyLoadMargin?: number;
}

export class AdManager {
    /**
     * Determines optimal ad placement based on viewport and content
     */
    static getOptimalPlacement(): 'auto' | 'content' | 'sidebar' | 'footer' {
        if (typeof window === 'undefined') return 'auto';

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspectRatio = width / height;

        // Wide screens - sidebar works well
        if (width >= 1200 && aspectRatio > 1.5) {
            return 'sidebar';
        }

        // Tablet landscape - content placement
        if (width >= 768 && width < 1200) {
            return 'content';
        }

        // Mobile - footer is least intrusive
        if (width < 768) {
            return 'footer';
        }

        // Default to auto for browser to decide
        return 'auto';
    }

    /**
     * Checks if ads should be shown based on user preferences
     */
    static shouldShowAds(): boolean {
        if (typeof window === 'undefined') return true;

        // Respect user's reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check if user has ad blocker (basic check)
        const hasAdBlocker = this.detectAdBlocker();

        // Don't show ads if ad blocker is detected (prevents layout issues)
        if (hasAdBlocker) {
            return false;
        }

        return true;
    }

    /**
     * Basic ad blocker detection
     */
    private static detectAdBlocker(): boolean {
        if (typeof window === 'undefined') return false;

        // Check if adsbygoogle is blocked
        try {
            return window.adsbygoogle === undefined;
        } catch {
            return true;
        }
    }

    /**
     * Calculates safe lazy load margin based on viewport
     */
    static getLazyLoadMargin(): number {
        if (typeof window === 'undefined') return 200;

        const height = window.innerHeight;

        // Load ads when they're within 1.5 viewports
        return Math.floor(height * 1.5);
    }

    /**
     * Gets recommended minimum width for ad display
     */
    static getMinWidth(placement: 'auto' | 'content' | 'sidebar' | 'footer'): number {
        switch (placement) {
            case 'sidebar':
                return 1024; // Only show sidebar ads on larger screens
            case 'footer':
                return 0; // Footer ads work on all sizes
            case 'content':
                return 480; // Content ads need some space
            case 'auto':
            default:
                return 320; // Minimum for any ad
        }
    }

    /**
     * Creates optimal ad configuration for a given page type
     */
    static getConfigForPageType(pageType: 'article' | 'landing' | 'tool' | 'list'): AdPlacementConfig {
        const baseConfig: AdPlacementConfig = {
            placement: 'auto',
            lazyLoad: true,
            lazyLoadMargin: this.getLazyLoadMargin()
        };

        switch (pageType) {
            case 'article':
                // Articles benefit from content-flow ads
                return {
                    ...baseConfig,
                    placement: 'content',
                    minWidth: 480
                };

            case 'landing':
                // Landing pages - footer is least disruptive
                return {
                    ...baseConfig,
                    placement: 'footer',
                    minWidth: 0
                };

            case 'tool':
                // Tools/apps - sidebar keeps workspace clear
                return {
                    ...baseConfig,
                    placement: 'sidebar',
                    minWidth: 1024
                };

            case 'list':
                // Lists - auto placement works well
                return {
                    ...baseConfig,
                    placement: 'auto',
                    minWidth: 320
                };

            default:
                return baseConfig;
        }
    }

    /**
     * Monitors ad performance (CLS, viewability)
     */
    static monitorAdPerformance(adElement: HTMLElement) {
        if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

        try {
            // Monitor Cumulative Layout Shift
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if ((entry as any).hadRecentInput) continue;

                    const clsValue = (entry as any).value;
                    if (clsValue > 0.1) {
                        console.warn('Ad caused layout shift:', clsValue);
                    }
                }
            });

            observer.observe({ type: 'layout-shift', buffered: true });
        } catch (error) {
            console.warn('Performance monitoring not available:', error);
        }
    }
}

/**
 * Hook-friendly wrapper for optimal placement
 */
export function useOptimalAdPlacement() {
    if (typeof window === 'undefined') return 'auto';
    return AdManager.getOptimalPlacement();
}
