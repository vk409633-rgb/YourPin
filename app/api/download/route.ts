import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const url = searchParams.get('url');
        const filename = searchParams.get('filename') || 'download';

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        // Fetch the file from the external URL
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch the file' },
                { status: response.status }
            );
        }

        // Get the file content
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Get content type from the response or default
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        // Create response with proper headers for download
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length.toString(),
            },
        });

    } catch (error) {
        console.error('Download proxy error:', error);
        return NextResponse.json(
            { error: 'Failed to download file' },
            { status: 500 }
        );
    }
}
