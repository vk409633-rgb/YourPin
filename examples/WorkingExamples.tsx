/**
 * Complete Working Examples - Adaptive Ads
 * 
 * These are fully functional React components you can use as reference
 * or copy directly into your project.
 */

import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';
import { AdManager } from '@/utils/adManager';

// ============================================
// EXAMPLE 1: Blog Post with Multiple Ads
// ============================================
export function BlogPostExample() {
    return (
        <article>
            <h1>Article Title</h1>

            {/* Intro content */}
            <p>First paragraph...</p>

            {/* First ad after intro */}
            <AdaptiveAdUnit
                placement="content"
                minWidth={480}
            />

            {/* Main content */}
            <p>More content...</p>
            <p>Even more content...</p>

            {/* Second ad mid-article */}
            <AdaptiveAdUnit
                placement="content"
                minWidth={480}
            />

            {/* Conclusion */}
            <p>Final thoughts...</p>

            {/* Footer ad */}
            <AdaptiveAdUnit placement="footer" />
        </article>
    );
}

// ============================================
// EXAMPLE 2: Tool Page with Sidebar
// ============================================
export function ToolPageExample() {
    return (
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Main content */}
            <main style={{ flex: 1 }}>
                <h1>Tool Interface</h1>
                <p>Your tool content here...</p>

                {/* Mobile ad (hidden on desktop) */}
                <AdaptiveAdUnit
                    placement="content"
                    minWidth={0}
                />
            </main>

            {/* Sidebar with ad */}
            <aside style={{ width: '336px' }}>
                <AdaptiveAdUnit
                    placement="sidebar"
                    minWidth={1024}
                />
            </aside>
        </div>
    );
}

// ============================================
// EXAMPLE 3: Landing Page (Minimal Ads)
// ============================================
export function LandingPageExample() {
    return (
        <div>
            <header>
                <h1>Welcome to Our Service</h1>
                <p>Hero section content...</p>
            </header>

            <section>
                <h2>Features</h2>
                <p>Feature list...</p>
            </section>

            <section>
                <h2>Testimonials</h2>
                <p>Customer reviews...</p>
            </section>

            {/* Single footer ad - least intrusive */}
            <AdaptiveAdUnit placement="footer" />
        </div>
    );
}

// ============================================
// EXAMPLE 4: Smart Configuration by Page Type
// ============================================
export function SmartConfigExample() {
    const config = AdManager.getConfigForPageType('article');

    return (
        <div>
            <h1>My Article</h1>
            <p>Content...</p>

            <AdaptiveAdUnit {...config} />
        </div>
    );
}

// ============================================
// EXAMPLE 5: Conditional Ad Display
// ============================================
export function ConditionalAdExample() {
    const showAds = AdManager.shouldShowAds();

    return (
        <div>
            <h1>Content</h1>
            <p>Main content here...</p>

            {showAds && (
                <AdaptiveAdUnit placement="content" />
            )}
        </div>
    );
}

// ============================================
// EXAMPLE 6: Pinterest Downloader with Ads
// ============================================
export function PinterestDownloaderWithAds() {
    const toolConfig = AdManager.getConfigForPageType('tool');

    return (
        <div className="page-container">
            <main className="main-content">
                <h1>Pinterest Video Downloader</h1>
                <p>Download Pinterest videos in high quality</p>

                {/* Your tool interface here */}
                <div className="tool-interface">
                    {/* Tool content */}
                </div>

                {/* Ad in content flow - shows on mobile */}
                <AdaptiveAdUnit
                    placement="content"
                    minWidth={0}
                    lazyLoad={true}
                />

                {/* More content */}
                <section className="features">
                    <h2>Features</h2>
                    {/* Feature list */}
                </section>

                {/* Footer ad - least intrusive */}
                <AdaptiveAdUnit
                    placement="footer"
                    lazyLoad={true}
                />
            </main>

            {/* Sidebar - only shows on desktop */}
            <aside className="sidebar">
                <AdaptiveAdUnit
                    {...toolConfig}
                    placement="sidebar"
                />
            </aside>
        </div>
    );
}

// ============================================
// EXAMPLE 7: Simple Auto-Placement
// ============================================
export function SimpleAdExample() {
    return (
        <div>
            <h1>My Page</h1>
            <p>Content...</p>

            {/* Simplest usage - browser decides placement */}
            <AdaptiveAdUnit />
        </div>
    );
}

// ============================================
// EXAMPLE 8: Custom Styled Ad
// ============================================
export function CustomStyledAdExample() {
    return (
        <div>
            <h1>Content</h1>

            <AdaptiveAdUnit
                placement="content"
                className="my-custom-ad-style"
                lazyLoad={true}
            />
        </div>
    );
}

// ============================================
// EXAMPLE 9: Different Ads for Different Sections
// ============================================
export function MultiSectionAdExample() {
    return (
        <div>
            {/* Header section */}
            <header>
                <h1>Main Content</h1>
            </header>

            {/* Content section with content ad */}
            <section>
                <h2>Article Section</h2>
                <p>Content...</p>
                <AdaptiveAdUnit
                    placement="content"
                    minWidth={480}
                />
            </section>

            {/* Sidebar section with sidebar ad */}
            <aside>
                <h3>Related Links</h3>
                <AdaptiveAdUnit
                    placement="sidebar"
                    minWidth={1024}
                />
            </aside>

            {/* Footer section with footer ad */}
            <footer>
                <AdaptiveAdUnit placement="footer" />
            </footer>
        </div>
    );
}

// ============================================
// EXAMPLE 10: Responsive Grid with Ads
// ============================================
export function ResponsiveGridWithAds() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '2rem'
        }}>
            <div>
                <h2>Column 1</h2>
                <p>Content...</p>
            </div>

            <div>
                <h2>Column 2</h2>
                <p>Content...</p>
            </div>

            <div>
                <h2>Column 3</h2>
                <p>Content...</p>
            </div>

            {/* Ad spans full width */}
            <div style={{ gridColumn: '1 / -1' }}>
                <AdaptiveAdUnit placement="content" />
            </div>
        </div>
    );
}

// Default export for easy importing
export default {
    BlogPostExample,
    ToolPageExample,
    LandingPageExample,
    SmartConfigExample,
    ConditionalAdExample,
    PinterestDownloaderWithAds,
    SimpleAdExample,
    CustomStyledAdExample,
    MultiSectionAdExample,
    ResponsiveGridWithAds
};
