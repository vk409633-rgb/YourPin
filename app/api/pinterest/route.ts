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

        let pinData = null;
        let csrfToken = '';
        let cookieString = '';

        // Step 1: Fetch the page to get cookies and CSRF token
        try {
            console.log('[Pinterest API] Fetching page to get session...');
            const pageResponse = await fetch(`https://www.pinterest.com/pin/${pinId}/`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                },
            });

            // Extract cookies
            const setCookieHeader = pageResponse.headers.get('set-cookie');
            if (setCookieHeader) {
                cookieString = setCookieHeader;
                // Simple extraction of csrftoken
                const match = setCookieHeader.match(/csrftoken=([a-zA-Z0-9]+)/);
                if (match && match[1]) {
                    csrfToken = match[1];
                    console.log('[Pinterest API] Got CSRF token:', csrfToken);
                }
            }
        } catch (e) {
            console.error('[Pinterest API] Failed to initialize session:', e);
        }

        // Step 2: Call Internal API with the token
        try {
            const pinterestApiUrl = `https://www.pinterest.com/resource/PinResource/get/?source_url=/pin/${pinId}/&data={"options":{"field_set_key":"detailed","id":"${pinId}"},"context":{}}`;

            console.log(`[Pinterest API] Attempting to fetch pin ${pinId} via internal API with token...`);

            const headers: Record<string, string> = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.pinterest.com/',
            };

            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }
            if (cookieString) {
                headers['Cookie'] = cookieString;
            }

            const response = await fetch(pinterestApiUrl, { headers });

            console.log(`[Pinterest API] Response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                pinData = data?.resource_response?.data;
                if (pinData) {
                    console.log('[Pinterest API] Successfully fetched data via internal API');
                } else {
                    console.log('[Pinterest API] API responded but no data found in response');
                }
            } else {
                console.log('[Pinterest API] API request failed with status:', response.status);
            }
        } catch (e) {
            console.log('[Pinterest API] API method failed:', e instanceof Error ? e.message : 'Unknown error');
        }

        // Method 3: Fallback to Page Scraping (if API failed)
        if (!pinData) {
            try {
                console.log('[Pinterest API] Using fallback scraping method...');
                const pageUrl = `https://www.pinterest.com/pin/${pinId}/`;
                const response = await fetch(pageUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    },
                });

                console.log(`[Pinterest API] Scraping response status: ${response.status}`);

                if (response.ok) {
                    const html = await response.text();

                    // Look for __PWS_DATA__ script
                    let jsonData = null;
                    const match = html.match(/<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
                    if (match && match[1]) {
                        try {
                            jsonData = JSON.parse(match[1]);
                        } catch (e) {
                            console.error('[Pinterest API] Failed to parse __PWS_DATA__');
                        }
                    }

                    // Look for __PWS_INITIAL_PROPS__ script
                    let initialProps = null;
                    const matchProps = html.match(/<script id="__PWS_INITIAL_PROPS__" type="application\/json">([\s\S]*?)<\/script>/);
                    if (matchProps && matchProps[1]) {
                        try {
                            initialProps = JSON.parse(matchProps[1]);
                        } catch (e) {
                            console.error('[Pinterest API] Failed to parse __PWS_INITIAL_PROPS__');
                        }
                    }

                    // Try to find pin data in __PWS_DATA__
                    if (jsonData?.props?.initialReduxState?.pins && jsonData.props.initialReduxState.pins[pinId]) {
                        pinData = jsonData.props.initialReduxState.pins[pinId];
                        console.log('[Pinterest API] Found pin data in __PWS_DATA__');
                    }

                    // Try to find pin data in __PWS_INITIAL_PROPS__
                    if (!pinData && initialProps) {
                        if (initialProps.initialReduxState?.pins && initialProps.initialReduxState.pins[pinId]) {
                            pinData = initialProps.initialReduxState.pins[pinId];
                            console.log('[Pinterest API] Found pin data in __PWS_INITIAL_PROPS__');
                        }
                    }
                }
            } catch (e) {
                console.error('[Pinterest API] Fallback scraping failed:', e instanceof Error ? e.message : 'Unknown error');
            }
        }

        if (!pinData) {
            return NextResponse.json(
                { error: 'Failed to fetch Pinterest data. Please try again later.' },
                { status: 404 }
            );
        }

        // Extract video URL
        let videoUrl = '';
        let thumbnailUrl = '';
        let title = pinData.title || pinData.grid_title || 'Pinterest Video';
        let description = pinData.description || '';

        // Handle video data
        if (pinData.videos?.video_list) {
            const videoList = pinData.videos.video_list;
            // Prioritize MP4 (V_720P) for better compatibility
            const qualities = ['V_720P', 'V_EXP7', 'V_EXP6', 'V_EXP5', 'V_EXP4', 'V_EXP3', 'V_HLSV4', 'V_HLSV3_WEB'];

            for (const quality of qualities) {
                if (videoList[quality]?.url) {
                    videoUrl = videoList[quality].url;
                    break;
                }
            }

            // Fallback to any video if specific qualities not found
            if (!videoUrl && Object.keys(videoList).length > 0) {
                const firstKey = Object.keys(videoList)[0];
                videoUrl = videoList[firstKey].url;
            }
        } else if (pinData.story_pin_data?.pages) {
            // Handle Story Pins (Idea Pins)
            const pages = pinData.story_pin_data.pages;
            if (pages.length > 0 && pages[0].videos?.video_list) {
                const videoList = pages[0].videos.video_list;
                const qualities = ['V_720P', 'V_HLSV4', 'V_HLSV3_WEB'];
                for (const quality of qualities) {
                    if (videoList[quality]?.url) {
                        videoUrl = videoList[quality].url;
                        break;
                    }
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

        // Ensure video URL is absolute
        if (videoUrl && videoUrl.startsWith('/')) {
            videoUrl = `https:${videoUrl}`;
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
