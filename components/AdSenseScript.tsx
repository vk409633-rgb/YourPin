import Script from 'next/script';

/**
 * AdSense Script Component
 * 
 * Add this to your root layout (app/layout.tsx) to load AdSense globally.
 * Uses Next.js Script component for optimal loading performance.
 */
export default function AdSenseScript() {
    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7431808618156384"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
