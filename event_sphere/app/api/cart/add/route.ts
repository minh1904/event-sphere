import { db } from '@/db';
import { cart_items, products } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, quantity } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !productId || !quantity) {
      return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 });
    }

    // 1. Lấy thông tin sản phẩm
    const product = await db
      .select({ ticketLeft: products.ticketLeft, price: products.price })
      .from(products)
      .where(eq(products.id, productId))
      .then((res) => res[0]);

    if (!product || product.ticketLeft === null) {
      return NextResponse.json(
        { error: 'Sản phẩm không tìm thấy hoặc không hợp lệ' },
        { status: 404 }
      );
    }

    // 2. Kiểm tra nếu đã có trong giỏ hàng
    const existing = await db
      .select()
      .from(cart_items)
      .where(
        and(eq(cart_items.userId, userId), eq(cart_items.productId, productId))
      )
      .then((res) => res[0]);

    const currentQuantity = existing?.quantity ?? 0;
    const totalAfterAdd = currentQuantity + quantity;

    // Kiểm tra số lượng còn lại của sản phẩm
    if (totalAfterAdd > product.ticketLeft) {
      return NextResponse.json(
        {
          error: 'Số lượng vượt quá số vé còn lại',
          ticketLeft: product.ticketLeft,
          currentQuantity,
        },
        { status: 400 }
      );
    }

    if (existing) {
      // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
      await db
        .update(cart_items)
        .set({ quantity: totalAfterAdd })
        .where(eq(cart_items.id, existing.id));
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      await db.insert(cart_items).values({
        userId,
        productId,
        quantity,
        price: product.price, // Thêm giá sản phẩm vào
        createdAt: new Date(),
      });
    }

    return NextResponse.json({
      message: 'Giỏ hàng đã được cập nhật thành công',
    });
  } catch (error) {
    console.error('[ADD_TO_CART_ERROR]', error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ khi thêm giỏ hàng' },
      { status: 500 }
    );
  }
}
