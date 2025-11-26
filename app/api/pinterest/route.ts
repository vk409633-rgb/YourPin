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

        // Validate Pinterest URL
        if (!url.includes('pinterest.com') && !url.includes('pin.it')) {
            return NextResponse.json(
                { error: 'Please provide a valid Pinterest URL' },
                { status: 400 }
            );
        }

        // Extract pin ID from URL
        let pinId = '';
        const pinMatch = url.match(/pin\/(\d+)/);
        if (pinMatch) {
            pinId = pinMatch[1];
        } else {
            // Handle shortened URLs (pin.it)
            try {
                const response = await fetch(url, { redirect: 'follow' });
                const redirectedUrl = response.url;
                const redirectMatch = redirectedUrl.match(/pin\/(\d+)/);
                if (redirectMatch) {
                    pinId = redirectMatch[1];
                }
            } catch (error) {
                return NextResponse.json(
                    { error: 'Failed to process Pinterest URL' },
                    { status: 400 }
                );
            }
        }

        if (!pinId) {
            return NextResponse.json(
                { error: 'Could not extract pin ID from URL' },
                { status: 400 }
            );
        }

        // Fetch pin data from Pinterest
        const pinterestApiUrl = `https://www.pinterest.com/resource/PinResource/get/?source_url=/pin/${pinId}/&data={"options":{"field_set_key":"detailed","id":"${pinId}"},"context":{}}`;

        const response = await fetch(pinterestApiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Pinterest data' },
                { status: 500 }
            );
        }

        const data = await response.json();
        const pinData = data?.resource_response?.data;

        if (!pinData) {
            return NextResponse.json(
                { error: 'No data found for this pin' },
                { status: 404 }
            );
        }

        // Extract video URL
        let videoUrl = '';
        let thumbnailUrl = '';
        let title = pinData.title || 'Pinterest Video';
        let description = pinData.description || '';

        if (pinData.videos?.video_list) {
            // Get the highest quality video
            const videoList = pinData.videos.video_list;
            const qualities = ['V_HLSV4', 'V_HLSV3_WEB', 'V_720P', 'V_EXP7', 'V_EXP6', 'V_EXP5', 'V_EXP4', 'V_EXP3'];

            for (const quality of qualities) {
                if (videoList[quality]?.url) {
                    videoUrl = videoList[quality].url;
                    break;
                }
            }
        }

        // Get thumbnail
        if (pinData.images?.orig?.url) {
            thumbnailUrl = pinData.images.orig.url;
        } else if (pinData.images?.['736x']?.url) {
            thumbnailUrl = pinData.images['736x'].url;
        }

        if (!videoUrl && !thumbnailUrl) {
            return NextResponse.json(
                { error: 'No video or image found for this pin' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                videoUrl,
                thumbnailUrl,
                title,
                description,
                pinId,
            },
        });

    } catch (error) {
        console.error('Pinterest download error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}
