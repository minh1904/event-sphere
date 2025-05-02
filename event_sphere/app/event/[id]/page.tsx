import { db } from '@/db';
import { product_images, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { format } from 'date-fns';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from 'next/link';
import ImgDisplay from '@/components/EventsInfor/ImgDisplay';
import EventAction from '@/components/EventsInfor/EventAction';
import Cart from '@/components/Cart';

export default async function Event({ params }: { params: { id: string } }) {
  const param = await params;
  const [eventId] = await db
    .select()
    .from(products)
    .where(eq(products.id, parseInt(param.id)));

  if (
    !eventId ||
    !eventId.dateStart ||
    !eventId.dateEnd ||
    !eventId.startTime ||
    !eventId.endTime
  ) {
    return <div>Không tìm thấy vé hoặc dữ liệu không hợp lệ</div>;
  }

  const images = await db
    .select({ imageUrl: product_images.imageUrl })
    .from(product_images)
    .where(eq(product_images.productId, eventId.id))
    .orderBy(product_images.order);

  // Hàm format ngày
  const formatDate = (date: string): string => {
    try {
      return format(new Date(date), 'dd/MM/yy');
    } catch {
      return 'Ngày không hợp lệ';
    }
  };

  // Hàm format giờ
  const formatTime = (time: string): string => {
    try {
      return format(new Date(`1970-01-01T${time}`), 'HH:mm');
    } catch {
      return 'Giờ không hợp lệ';
    }
  };

  // Format dữ liệu
  const formattedDateStart = formatDate(eventId.dateStart);
  const formattedDateEnd = formatDate(eventId.dateEnd);
  const formattedStartTime = formatTime(eventId.startTime);
  const formattedEndTime = formatTime(eventId.endTime);

  return (
    <div className="mt-20">
      <Cart></Cart>
      <Link
        href="/"
        className="bg-black ml-8 text-white rounded-[2px] p-1.5 h-7 xl:ml-8 xl:fixed "
      >
        Quay lại
      </Link>
      <div className="container px-8 pt-5 xl:flex">
        <ImgDisplay images={images} />
        <div className="event-in4 xl:ml-[26rem] xl:w-2xl xl:mt-2">
          <div className="pt-3">
            <div className="text-xl text-gray-800">
              {eventId.title ?? 'Không có tiêu đề'}
            </div>
            <div className="text-xl font-bold">
              {eventId.price !== null
                ? `${new Intl.NumberFormat('vi-VN').format(Number(eventId.price))}đ`
                : 'Không có giá'}
            </div>
          </div>
          <div className="pt-2">
            <p>Danh mục: {eventId.type ?? 'Không xác định'}</p>
            <p>Địa điểm: {eventId.location ?? 'Không xác định'}</p>
            <p>
              Thời gian: {formattedDateStart} - {formattedDateEnd}
            </p>
            <p className="mb-4">
              Giờ: {formattedStartTime} - {formattedEndTime}
            </p>
            <span className="font-bold">Chi tiết:</span>
            <p>{eventId.description ?? 'Không có mô tả'}</p>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-svw flex flex-row h-16 xl:hidden">
          <div className="basis-1/4 flex items-center justify-center bg-white h-full">
            <AddShoppingCartIcon />
          </div>
          <div className="basis-3/4 flex flex-col items-center justify-center h-full bg-black text-white">
            Mua ngay
            <span className="text-xl">
              {eventId.price?.toLocaleString() ?? 'N/A'}
            </span>
          </div>
        </div>
      </div>
      <EventAction price={Number(eventId.price)} />
    </div>
  );
}
