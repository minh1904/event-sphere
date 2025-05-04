import { NextRequest, NextResponse } from 'next/server';

import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { cart_items, products, users } from '@/db/schema';

// Xử lý yêu cầu POST
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Thiếu hoặc dữ liệu không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra sản phẩm
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product.length) {
      return NextResponse.json(
        { error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    // Kiểm tra số vé còn lại
    const ticketLeft = product[0]!.ticketLeft;
    if (ticketLeft == null || ticketLeft < quantity) {
      return NextResponse.json(
        { error: 'Không đủ vé còn lại' },
        { status: 400 }
      );
    }

    // Kiểm tra người dùng
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user.length) {
      return NextResponse.json(
        { error: 'Người dùng không tồn tại' },
        { status: 404 }
      );
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng
    const existingCartItem = await db
      .select()
      .from(cart_items)
      .where(
        and(eq(cart_items.userId, userId), eq(cart_items.productId, productId))
      )
      .limit(1);

    if (existingCartItem.length) {
      // Cập nhật số lượng
      await db
        .update(cart_items)
        .set({ quantity: existingCartItem[0].quantity + quantity })
        .where(
          and(
            eq(cart_items.userId, userId),
            eq(cart_items.productId, productId)
          )
        );
      return NextResponse.json({
        message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công',
      });
    }

    // Thêm mới vào giỏ hàng
    await db.insert(cart_items).values({
      userId,
      productId,
      quantity,
      price: product[0].price,
    });

    return NextResponse.json({
      message: 'Thêm sản phẩm vào giỏ hàng thành công',
    });
  } catch (error) {
    console.error('Lỗi API:', error);
    return NextResponse.json(
      { error: 'Lỗi server khi thêm vào giỏ hàng' },
      { status: 500 }
    );
  }
}
