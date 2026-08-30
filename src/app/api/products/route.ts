import { NextResponse } from 'next/server';
import { mockProducts } from '../../../data/mockProducts';

export const dynamic = 'force-static';

// API Route for fetching and creating products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  let filtered = [...mockProducts];

  if (city && city !== 'all') {
    filtered = filtered.filter((p) => p.city === city);
  }
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  return NextResponse.json({ success: true, products: filtered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: 'Product created successfully', product: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
