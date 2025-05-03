import { auth } from '@/auth';
import { db } from '@/db';
import { cart_items, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  console.log('User ID:', userId);

  const cartItems = await db
    .select({
      id: cart_items.id,
      productId: cart_items.productId,
      quantity: cart_items.quantity,
      price: cart_items.price,
      title: products.title,
      type: products.type,
      imageUrl: products.imageUrl,
    })
    .from(cart_items)
    .leftJoin(products, eq(cart_items.productId, products.id))
    .where(eq(cart_items.userId, userId));

  return NextResponse.json(cartItems);
}
