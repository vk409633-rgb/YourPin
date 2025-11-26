/**
 * AdSense Configuration Types
 * 
 * Type definitions for better TypeScript support
 */

export interface AdSenseConfig {
    /** Your AdSense publisher ID */
    publisherId: string;

    /** Default ad slot ID */
    defaultSlot: string;

    /** Additional ad slots for different placements */
    slots?: {
        sidebar?: string;
        content?: string;
        footer?: string;
        header?: string;
    };
}

export interface AdPlacement {
    /** Placement strategy */
    type: 'auto' | 'content' | 'sidebar' | 'footer';

    /** Minimum viewport width to show ad */
    minWidth: number;

    /** Enable lazy loading */
    lazyLoad: boolean;

    /** Lazy load margin in pixels */
    lazyLoadMargin: number;

    /** Ad slot ID */
    slotId?: string;
}

export interface AdPerformanceMetrics {
    /** Cumulative Layout Shift score */
    cls: number;

    /** Ad viewability percentage */
    viewability: number;

    /** Time to ad load (ms) */
    loadTime: number;

    /** Whether ad was lazy loaded */
    wasLazyLoaded: boolean;
}

/**
 * Global AdSense Configuration
 * Update this with your AdSense details
 */
export const ADSENSE_CONFIG: AdSenseConfig = {
    publisherId: 'ca-pub-7431808618156384',
    defaultSlot: '2146228323',

    // Optional: Define different slots for different placements
    slots: {
        sidebar: '2146228323',
        content: '2146228323',
        footer: '2146228323',
        // Add more slots as needed
    }
};

/**
 * Preset placement configurations
 */
export const AD_PRESETS: Record<string, AdPlacement> = {
    // Auto placement - browser decides
    auto: {
        type: 'auto',
        minWidth: 320,
        lazyLoad: true,
        lazyLoadMargin: 200
    },

    // Content flow - for articles and blog posts
    content: {
        type: 'content',
        minWidth: 480,
        lazyLoad: true,
        lazyLoadMargin: 300
    },

    // Sidebar - sticky on desktop
    sidebar: {
        type: 'sidebar',
        minWidth: 1024,
        lazyLoad: true,
        lazyLoadMargin: 200
    },

    // Footer - least intrusive
    footer: {
        type: 'footer',
        minWidth: 0,
        lazyLoad: true,
        lazyLoadMargin: 400
    },

    // Mobile optimized
    mobile: {
        type: 'footer',
        minWidth: 0,
        lazyLoad: true,
        lazyLoadMargin: 150
    },

    // Desktop optimized
    desktop: {
        type: 'sidebar',
        minWidth: 1200,
        lazyLoad: false,
        lazyLoadMargin: 0
    }
};

/**
 * Page type to placement mapping
 */
export const PAGE_TYPE_PRESETS: Record<string, AdPlacement> = {
    article: AD_PRESETS.content,
    blog: AD_PRESETS.content,
    landing: AD_PRESETS.footer,
    tool: AD_PRESETS.sidebar,
    list: AD_PRESETS.auto,
    homepage: AD_PRESETS.footer,
    about: AD_PRESETS.footer,
    contact: AD_PRESETS.footer,
};

/**
 * Helper function to get ad slot for placement
 */
export function getAdSlot(placement: 'auto' | 'content' | 'sidebar' | 'footer'): string {
    if (placement === 'auto') return ADSENSE_CONFIG.defaultSlot;
    return ADSENSE_CONFIG.slots?.[placement] || ADSENSE_CONFIG.defaultSlot;
}

/**
 * Helper function to get preset configuration
 */
export function getPreset(presetName: keyof typeof AD_PRESETS): AdPlacement {
    return AD_PRESETS[presetName] || AD_PRESETS.auto;
}

/**
 * Helper function to get configuration for page type
 */
export function getPageTypeConfig(pageType: keyof typeof PAGE_TYPE_PRESETS): AdPlacement {
    return PAGE_TYPE_PRESETS[pageType] || AD_PRESETS.auto;
}
