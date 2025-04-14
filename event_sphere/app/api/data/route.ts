// app/api/data/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  try {
    // Truy vấn dữ liệu từ database
    const allData = await db.select().from(products);

    // Chuyển đổi dữ liệu để phù hợp với định dạng frontend
    const formattedData = allData.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      type: product.type,
      dateRange: product.dateRange,
      timeRange: product.timeRange,
      price: parseFloat(product.price.toString()),
      isFree: product.isFree,
      ticketLeft: product.ticketLeft,
    }));

    // Trả về dữ liệu dưới dạng JSON
    return NextResponse.json({ events: formattedData }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to load events' },
      { status: 500 }
    );
  }
}
