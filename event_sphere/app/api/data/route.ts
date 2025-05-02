// app/api/data/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  try {
    const allData = await db.select().from(products);

    const formattedData = allData.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      type: product.type,
      dateStart: product.dateStart,
      dateEnd: product.dateEnd,
      startTime: product.startTime,
      endTime: product.endTime,
      price: parseFloat(product.price.toString()),
      isFree: product.isFree,
      ticketLeft: product.ticketLeft,
      location: product.location,
      short_title: product.shortTitle,
    }));

    return NextResponse.json({ events: formattedData }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to load events' },
      { status: 500 }
    );
  }
}
