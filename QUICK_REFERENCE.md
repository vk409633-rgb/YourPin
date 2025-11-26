# 📋 Quick Reference Card - Adaptive AdSense

## 🚀 Copy & Paste Examples

### 1️⃣ Basic (Auto Placement)
```tsx
import AdaptiveAdUnit from '@/components/AdaptiveAdUnit';

<AdaptiveAdUnit />
```

### 2️⃣ Sidebar (Desktop Only)
```tsx
<AdaptiveAdUnit placement="sidebar" minWidth={1024} />
```

### 3️⃣ Content Flow
```tsx
<AdaptiveAdUnit placement="content" minWidth={480} />
```

### 4️⃣ Footer (Least Intrusive)
```tsx
<AdaptiveAdUnit placement="footer" />
```

### 5️⃣ Smart Config
```tsx
import { AdManager } from '@/utils/adManager';

const config = AdManager.getConfigForPageType('article');
<AdaptiveAdUnit {...config} />
```

---

## 📊 Placement Quick Guide

| Use Case | Code | Shows On |
|----------|------|----------|
| General page | `<AdaptiveAdUnit />` | All devices |
| Blog post | `placement="content"` | Desktop + Tablet |
| Tool page | `placement="sidebar"` | Desktop only |
| Landing page | `placement="footer"` | All devices |

---

## ⚙️ All Props

```tsx
<AdaptiveAdUnit 
  placement="auto"           // 'auto' | 'content' | 'sidebar' | 'footer'
  minWidth={320}             // Minimum viewport width
  lazyLoad={true}            // Enable lazy loading
  lazyLoadMargin={200}       // Pixels before loading
  adSlot="2146228323"        // Your ad slot ID
  className="custom-class"   // Custom CSS class
/>
```

---

## 🎯 Page Type Configs

```tsx
import { AdManager } from '@/utils/adManager';

// Article/Blog
AdManager.getConfigForPageType('article')
// → { placement: 'content', minWidth: 480 }

// Landing Page
AdManager.getConfigForPageType('landing')
// → { placement: 'footer', minWidth: 0 }

// Tool/App
AdManager.getConfigForPageType('tool')
// → { placement: 'sidebar', minWidth: 1024 }

// List Page
AdManager.getConfigForPageType('list')
// → { placement: 'auto', minWidth: 320 }
```

---

## 📁 Files Created

- `components/AdaptiveAdUnit.tsx` - Main component
- `components/AdaptiveAdUnit.module.css` - Styles
- `components/AdSenseScript.tsx` - Script loader
- `utils/adManager.ts` - Ad logic
- `config/adsense.config.ts` - Configuration

---

## 📖 Documentation

- `INSTALLATION_COMPLETE.md` - Start here!
- `ADAPTIVE_ADS_README.md` - Full overview
- `ADSENSE_IMPLEMENTATION.md` - Detailed guide
- `examples/QUICK_AD_EXAMPLES.tsx` - 10 examples
- `VISUAL_GUIDE.tsx` - Visual diagrams

---

## ✅ Checklist

- [x] AdSense script added to layout.tsx
- [ ] Add `<AdaptiveAdUnit />` to your pages
- [ ] Test in development mode
- [ ] Check AdSense dashboard
- [ ] Monitor Core Web Vitals

---

## 🔧 Your Settings

- **Publisher ID:** `ca-pub-7431808618156384`
- **Ad Slot:** `2146228323`
- **Format:** Auto (responsive)

---

## 💡 Pro Tips

1. Start with `<AdaptiveAdUnit />` (simplest)
2. Use `placement="footer"` for least intrusion
3. Enable `lazyLoad={true}` for better performance
4. Set `minWidth` to hide ads on small screens
5. Monitor CLS in Google Search Console

---

## 🚨 Troubleshooting

**Ads not showing?**
- Check AdSense approval status
- Verify ad slot ID
- Disable ad blocker
- Check browser console

**Layout shifts?**
- Verify CSS module imported
- Check reserved space rendering
- Monitor with DevTools

**Performance issues?**
- Enable lazy loading
- Reduce number of ads
- Increase lazyLoadMargin

---

## 📞 Quick Help

```tsx
// Check if ads should show
import { AdManager } from '@/utils/adManager';
const showAds = AdManager.shouldShowAds();

// Get optimal placement
const placement = AdManager.getOptimalPlacement();

// Get lazy load margin
const margin = AdManager.getLazyLoadMargin();
```

---

**Print this card for quick reference! 🖨️**
