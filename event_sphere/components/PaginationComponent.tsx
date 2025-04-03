'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginationProps {
  pageCount: number;
}

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Hàm tạo URL cho trang
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Xử lý điều hướng khi nhấn nút
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      router.push(createPageURL(page));
    }
  };

  // Tính toán các trang để hiển thị
  const maxVisiblePages = 3; // Số trang tối đa hiển thị (có thể thay đổi)
  const halfRange = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(pageCount, currentPage + halfRange);

  // Điều chỉnh để luôn hiển thị đủ số trang tối đa nếu có thể
  if (endPage - startPage + 1 < maxVisiblePages) {
    if (currentPage <= halfRange + 1) {
      endPage = Math.min(maxVisiblePages, pageCount);
    } else {
      startPage = Math.max(1, pageCount - maxVisiblePages + 1);
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Trang đầu tiên */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={createPageURL(1)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationEllipsis />}
          </>
        )}

        {/* Các trang gần currentPage */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageURL(page)}
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Trang cuối cùng */}
        {endPage < pageCount && (
          <>
            {endPage < pageCount - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href={createPageURL(pageCount)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageCount);
                }}
                isActive={currentPage === pageCount}
              >
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={
              currentPage >= pageCount ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
