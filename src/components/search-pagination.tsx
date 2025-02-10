import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 7;
const SEPARATOR = '...';

export default function SearchPagination({ currentPage, totalPages, onPageChange }: Props) {
  const getPaginationItems = () => {
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPages = [1];
      const endPages = [totalPages];
      const middlePages = [];

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          middlePages.push(i);
        }
        middlePages.push(SEPARATOR);
      } else if (currentPage >= totalPages - 3) {
        middlePages.push(SEPARATOR);
        for (let i = totalPages - 4; i < totalPages; i++) {
          middlePages.push(i);
        }
      } else {
        middlePages.push(SEPARATOR);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          middlePages.push(i);
        }
        middlePages.push(SEPARATOR);
      }

      pages.push(...startPages, ...middlePages, ...endPages);
    }

    return pages;
  };

  const pages = getPaginationItems();

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === 'number' ? (
              <PaginationLink href="#" isActive={page === currentPage} onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}