import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import PaginatedModel from "@/src/helpers/pagination";

export function CustomPagination({
  data,
  onPageChange,
}: {
  data: PaginatedModel<any>;
  onPageChange: (pageNumber: number) => void;
}) {
  const maxPagesToShow = 5; // Maximum number of pages to show
  const pages = [];
  const showEllipsis = (side: "left" | "right") => {
    return (
      <Button key={`ellipsis-${side}`} variant="outline" size="sm" disabled>
        ...
      </Button>
    );
  };

  const showPageButton = (page: number) => {
    return (
      <Button
        key={page}
        variant={page === data.current_page ? "default" : "outline"}
        size="sm"
        onClick={() => onPageChange(page)}
        disabled={page === data.current_page}
      >
        {page}
      </Button>
    );
  };
  pages.push(showPageButton(1));

  if (data.current_page > 3) {
    pages.push(showEllipsis("left"));
  }

  // Calculate start and end page numbers to show around the current page
  const startPage = Math.max(data.current_page - 1, 2);
  const endPage = Math.min(data.current_page + 1, data.last_page - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(showPageButton(i));
  }

  if (data.current_page < data.last_page - 2) {
    pages.push(showEllipsis("right"));
  }

  // Always show the last page
  if (data.last_page > 1) {
    pages.push(showPageButton(data.last_page));
  }

  pages.unshift(
    <Button
      key="prev"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(data.current_page - 1)}
      disabled={data.current_page < 2}
    >
      <ChevronLeft className="text-primary" size={20} />
    </Button>
  );

  pages.push(
    <Button
      key="next"
      variant="outline"
      size="sm"
      onClick={() => onPageChange(data.current_page + 1)}
      disabled={data.current_page >= data.last_page}
    >
      <ChevronRight className="text-primary" size={20} />
    </Button>
  );

  return pages;
}

export default CustomPagination;
