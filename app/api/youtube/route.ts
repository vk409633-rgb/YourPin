import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url || typeof url !== 'string') {
            return NextResponse.json(
                { error: 'Invalid URL provided' },
                { status: 400 }
            );
        }

        // Validate YouTube URL
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return NextResponse.json(
                { error: 'Please provide a valid YouTube URL' },
                { status: 400 }
            );
        }

        // Extract video ID from URL
        let videoId = '';

        // Handle different YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                videoId = match[1];
                break;
            }
        }

        if (!videoId) {
            return NextResponse.json(
                { error: 'Could not extract video ID from URL' },
                { status: 400 }
            );
        }

        // Generate thumbnail URLs in different qualities
        const thumbnails = {
            maxres: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            sd: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
            hq: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            mq: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            default: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
        };

        // Verify that at least the default thumbnail exists
        try {
            const response = await fetch(thumbnails.maxres, { method: 'HEAD' });
            if (!response.ok) {
                // Try SD quality if maxres doesn't exist
                const sdResponse = await fetch(thumbnails.sd, { method: 'HEAD' });
                if (!sdResponse.ok) {
                    return NextResponse.json(
                        { error: 'Could not find thumbnails for this video' },
                        { status: 404 }
                    );
                }
            }
        } catch (error) {
            return NextResponse.json(
                { error: 'Failed to verify thumbnail availability' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                videoId,
                thumbnails,
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            },
        });

    } catch (error) {
        console.error('YouTube thumbnail error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}
