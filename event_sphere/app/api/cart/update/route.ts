import { db } from '@/db';
import { cart_items, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity == null) {
      return NextResponse.json(
        { error: 'Thiếu id sản phẩm hoặc số lượng' },
        { status: 400 }
      );
    }

    const productResult = await db
      .select({ ticketLeft: products.ticketLeft })
      .from(products)
      .where(eq(products.id, productId));

    const product = productResult[0];

    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    if (quantity > product.ticketLeft!) {
      return NextResponse.json(
        {
          error: 'Số lượng vượt quá số vé còn lại',
          ticketLeft: product.ticketLeft,
        },
        { status: 400 }
      );
    }

    // ✅ Update giỏ hàng nếu hợp lệ
    await db
      .update(cart_items)
      .set({ quantity })
      .where(eq(cart_items.productId, productId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CART_PUT_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    await db
      .delete(cart_items)
      .where(eq(cart_items.productId, Number(productId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CART_DELETE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
