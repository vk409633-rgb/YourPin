# Quick Start: Add Ads to Your Pages

Copy and paste these examples into your pages

---

## EXAMPLE 1: Simple Auto-Placement Ad

Just drop this anywhere in your page. The browser will choose the best placement.

```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';

<AdaptiveAdUnit />
```

---

## EXAMPLE 2: Content Flow Ad (Blog/Article)

Perfect for blog posts and articles. Flows naturally with your content.

```tsx
<AdaptiveAdUnit 
  placement="content"
  minWidth={480}
  lazyLoad={true}
/>
```

---

## EXAMPLE 3: Sidebar Ad (Desktop Only)

Sticky sidebar ad for desktop users. Automatically hidden on mobile.

```tsx
<AdaptiveAdUnit 
  placement="sidebar"
  minWidth={1024}
  lazyLoad={true}
/>
```

---

## EXAMPLE 4: Footer Ad (Least Intrusive)

Bottom of page, works on all devices. Best for landing pages.

```tsx
<AdaptiveAdUnit 
  placement="footer"
  lazyLoad={true}
/>
```

---

## EXAMPLE 5: Smart Configuration

Let the AdManager choose based on page type.

```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';
import { AdManager } from '@/utils/adManager';

export default function MyPage() {
  const config = AdManager.getConfigForPageType('article');
  
  return (
    <div>
      <h1>My Article</h1>
      <p>Content...</p>
      
      <AdaptiveAdUnit {...config} />
    </div>
  );
}
```

---

## EXAMPLE 6: Multiple Ads on Same Page

Strategic placement for maximum revenue without overwhelming users.

```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';

export default function BlogPost() {
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
```

---

## EXAMPLE 7: Responsive Layout with Ads

Two-column layout with sidebar ad.

```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';

export default function ToolPage() {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Main content */}
      <main style={{ flex: 1 }}>
        <h1>Tool Interface</h1>
        {/* Your tool here */}
        
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
```

---

## EXAMPLE 8: Custom Styling

Add custom classes for additional styling.

```tsx
<AdaptiveAdUnit 
  placement="content"
  className="my-custom-ad-style"
  lazyLoad={true}
/>
```

In your CSS:
```css
.my-custom-ad-style {
  margin: 3rem 0;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
}
```

---

## EXAMPLE 9: Conditional Ad Display

Show ads only on certain conditions.

```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';
import { AdManager } from '@/utils/adManager';

export default function ConditionalAd() {
  const showAds = AdManager.shouldShowAds();
  
  return (
    <div>
      <h1>Content</h1>
      
      {showAds && (
        <AdaptiveAdUnit placement="content" />
      )}
    </div>
  );
}
```

---

## EXAMPLE 10: Different Ads for Different Pages

Use different ad slots for different pages.

```tsx
// Homepage
<AdaptiveAdUnit 
  adSlot="2146228323"
  placement="footer"
/>

// Tool page
<AdaptiveAdUnit 
  adSlot="YOUR_OTHER_SLOT_ID"
  placement="sidebar"
/>
```
