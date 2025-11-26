/**
 * Example: Using Adaptive Ads in a Tool Page
 * 
 * This example demonstrates how to integrate ads into your tool pages
 * with minimal intrusion and optimal placement across different devices.
 * 
 * Usage:
 * - Import this component as a reference
 * - Copy the pattern to your own pages
 * - Adjust placements based on your layout
 */

'use client';

import { useEffect, useState } from 'react';
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';
import { AdManager } from '@/utils/adManager';

export default function AdaptiveAdsExample() {
    // Get optimal configuration for a tool page
    const toolConfig = AdManager.getConfigForPageType('tool');

    // Check if ads should be shown
    const [showAds, setShowAds] = useState(true);

    useEffect(() => {
        setShowAds(AdManager.shouldShowAds());
    }, []);

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem'
        }}>
            {/* Main content area */}
            <main style={{ minWidth: 0 }}>
                <h1>Pinterest Video Downloader</h1>
                <p>Download Pinterest videos in high quality</p>

                {/* Your tool interface here */}
                <div style={{
                    padding: '2rem',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    marginTop: '1rem'
                }}>
                    <p>Tool interface goes here...</p>
                </div>

                {/* Ad in content flow - shows on mobile when sidebar is hidden */}
                {showAds && (
                    <AdaptiveAdUnit
                        placement="content"
                        minWidth={0}
                        lazyLoad={true}
                    />
                )}

                {/* More content */}
                <section style={{ marginTop: '2rem' }}>
                    <h2>Features</h2>
                    <ul>
                        <li>High quality downloads</li>
                        <li>Fast processing</li>
                        <li>No watermarks</li>
                    </ul>
                </section>

                {/* Footer ad - least intrusive */}
                {showAds && (
                    <AdaptiveAdUnit
                        placement="footer"
                        lazyLoad={true}
                    />
                )}
            </main>

            {/* Sidebar - only shows on desktop (1024px+) */}
            <aside style={{
                width: '336px',
                display: 'block'
            }}>
                <div style={{
                    position: 'sticky',
                    top: '20px'
                }}>
                    {showAds && (
                        <AdaptiveAdUnit
                            {...toolConfig}
                            placement="sidebar"
                        />
                    )}
                </div>
            </aside>
        </div>
    );
}

// Export named version as well
export { AdaptiveAdsExample };
