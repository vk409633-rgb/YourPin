import type { Metadata } from "next";
import "./globals.css";
import AdSenseScript from "@/components/AdSenseScript";

export const metadata: Metadata = {
    metadataBase: new URL('https://yourpin.com'),
    title: {
        default: "YourPin - Free Pinterest Video & YouTube Thumbnail Downloader",
        template: "%s | YourPin"
    },
    description: "Download Pinterest videos and YouTube thumbnails in high quality for free. Fast, secure, and easy-to-use online downloader tool. No registration required.",
    keywords: ["pinterest video downloader", "youtube thumbnail downloader", "download pinterest videos", "youtube thumbnail grabber", "free video downloader", "pinterest downloader", "youtube thumbnail download"],
    authors: [{ name: "YourPin" }],
    creator: "YourPin",
    publisher: "YourPin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://yourpin.com",
        title: "YourPin - Free Pinterest Video & YouTube Thumbnail Downloader",
        description: "Download Pinterest videos and YouTube thumbnails in high quality for free. Fast, secure, and easy-to-use online downloader tool.",
        siteName: "YourPin",
    },
    twitter: {
        card: "summary_large_image",
        title: "YourPin - Free Pinterest Video & YouTube Thumbnail Downloader",
        description: "Download Pinterest videos and YouTube thumbnails in high quality for free. Fast, secure, and easy-to-use online downloader tool.",
        creator: "@yourpin",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <AdSenseScript />
                <meta name="google-adsense-account" content="ca-pub-7431808618156384" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://yourpin.com" />
            </head>
            <body>{children}</body>
        </html>
    );
}
