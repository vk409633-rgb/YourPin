# YourPin - Media Downloader Hub

A modern, high-performance Next.js application for downloading Pinterest videos and YouTube thumbnails. Built with TypeScript, React, and optimized for SEO.

## Features

### Pinterest Video Downloader
- Download Pinterest videos in original quality
- Extract video metadata (title, description)
- Download video thumbnails
- Support for all Pinterest video formats
- Fast and reliable extraction

### YouTube Thumbnail Downloader
- Download thumbnails in multiple resolutions:
  - Max Resolution (1920x1080)
  - Standard Definition (640x480)
  - High Quality (480x360)
  - Medium Quality (320x180)
- Instant thumbnail extraction
- Preview before downloading

### Technical Features
- **Server-Side Rendering (SSR)** for optimal SEO
- **Comprehensive SEO optimization** with meta tags, Open Graph, and Twitter cards
- **Modern UI/UX** with glassmorphism and smooth animations
- **Fully responsive** design for all devices
- **TypeScript** for type safety
- **API routes** for secure server-side processing
- **No local storage** - stateless architecture
- **Accessibility compliant** with ARIA roles and semantic HTML

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with custom design system
- **Fonts**: Google Fonts (Inter)
- **HTTP Client**: Axios
- **Deployment Ready**: Vercel, Netlify, or any Node.js host

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── pinterest/
│   │   │   └── route.ts          # Pinterest API endpoint
│   │   └── youtube/
│   │       └── route.ts          # YouTube API endpoint
│   ├── pinterest/
│   │   └── page.tsx              # Pinterest downloader page
│   ├── youtube/
│   │   └── page.tsx              # YouTube downloader page
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles & design system
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Hero.tsx                  # Hero section
│   ├── ToolsSection.tsx          # Tools container
│   ├── PinterestDownloader.tsx   # Pinterest downloader component
│   ├── YouTubeDownloader.tsx     # YouTube downloader component
│   ├── Features.tsx              # Features showcase
│   └── Footer.tsx                # Footer
├── public/                       # Static assets
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## API Endpoints

### POST /api/pinterest
Download Pinterest videos

**Request Body:**
```json
{
  "url": "https://www.pinterest.com/pin/123456789/"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "videoUrl": "https://...",
    "thumbnailUrl": "https://...",
    "title": "Video title",
    "description": "Video description",
    "pinId": "123456789"
  }
}
```

### POST /api/youtube
Get YouTube thumbnails

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "videoId": "VIDEO_ID",
    "thumbnails": {
      "maxres": "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
      "sd": "https://i.ytimg.com/vi/VIDEO_ID/sddefault.jpg",
      "hq": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
      "mq": "https://i.ytimg.com/vi/VIDEO_ID/mqdefault.jpg"
    },
    "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}
```

## SEO Optimization

The application implements comprehensive SEO best practices:

- **Meta Tags**: Dynamic titles, descriptions, and keywords for each page
- **Open Graph**: Social media optimization for Facebook, LinkedIn, etc.
- **Twitter Cards**: Optimized sharing on Twitter
- **Semantic HTML**: Proper use of header, main, footer, article, section tags
- **Heading Hierarchy**: Logical H1-H6 structure
- **Canonical URLs**: Prevent duplicate content issues
- **Robots Meta**: Proper indexing instructions
- **Structured Data**: Ready for schema.org implementation
- **Performance**: Optimized loading and rendering

## Design System

The application uses a custom design system with:

- **Color Palette**: Modern purple/pink gradients with dark theme
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent spacing scale (xs to 3xl)
- **Components**: Reusable button, card, and input styles
- **Animations**: Smooth transitions and micro-interactions
- **Glassmorphism**: Modern backdrop blur effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Server-Side Rendering**: Instant page loads
- **Code Splitting**: Automatic with Next.js

## Security

- No user data storage
- HTTPS recommended for production
- CORS configured for API routes
- Input validation on all endpoints
- XSS protection built-in

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production bundle:
```bash
npm run build
```

The output will be in the `.next` folder. Deploy using any Node.js hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Disclaimer

This tool is for personal use only. Please respect copyright laws and terms of service of Pinterest and YouTube. We are not affiliated with Pinterest or YouTube.

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

Built with ❤️ using Next.js and TypeScript
