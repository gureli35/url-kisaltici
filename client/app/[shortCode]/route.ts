import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

// Import the models
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { initializeDatabase, findByShortCode, incrementClickCount } = require('../../models/url.model');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    // Initialize database
    await initializeDatabase();

    const { shortCode } = await params;

    if (!shortCode) {
      return new Response('Short code is required', { status: 400 });
    }

    const url = await findByShortCode(shortCode);

    if (!url) {
      return new Response('Short URL not found', { status: 404 });
    }

    // Increment click count
    await incrementClickCount(shortCode);

    // Redirect to original URL
    redirect(url.original_url);

  } catch (error: unknown) {
    console.error('Redirect Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
