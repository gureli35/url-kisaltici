import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import validator from 'validator';

// Import the models - we'll need to convert them to TypeScript compatible
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { initializeDatabase, create, findByOriginalUrl, findAll } = require('../../../models/url.model');

export async function POST(request: NextRequest) {
  try {
    // Initialize database
    await initializeDatabase();

    const { originalUrl } = await request.json();

    if (!originalUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'Original URL is required' 
      }, { status: 400 });
    }

    if (!validator.isURL(originalUrl)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide a valid URL' 
      }, { status: 400 });
    }

    // Check if URL already exists
    const existingUrl = await findByOriginalUrl(originalUrl);
    if (existingUrl) {
      const host = request.headers.get('host') || 'localhost:3000';
      return NextResponse.json({
        success: true,
        data: {
          id: existingUrl.id,
          originalUrl: existingUrl.original_url,
          shortCode: existingUrl.short_code,
          shortUrl: `https://${host}/${existingUrl.short_code}`,
          clickCount: existingUrl.click_count,
          createdAt: existingUrl.created_at
        }
      });
    }

    // Generate short code
    const shortCode = nanoid(8);
    
    // Create new URL
    const urlData = await create({
      originalUrl,
      shortCode
    });

    const host = request.headers.get('host') || 'localhost:3000';
    
    return NextResponse.json({
      success: true,
      data: {
        id: urlData.id,
        originalUrl: urlData.originalUrl,
        shortCode: urlData.shortCode,
        shortUrl: `https://${host}/${urlData.shortCode}`,
        clickCount: 0,
        createdAt: new Date().toISOString()
      }
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Initialize database
    await initializeDatabase();

    const urls = await findAll();
    const host = request.headers.get('host') || 'localhost:3000';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedUrls = urls.map((url: any) => ({
      id: url.id,
      originalUrl: url.original_url,
      shortCode: url.short_code,
      shortUrl: `https://${host}/${url.short_code}`,
      clickCount: url.click_count,
      createdAt: url.created_at
    }));

    return NextResponse.json({
      success: true,
      data: formattedUrls
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
