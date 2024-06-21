import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import PaginatedModel from "@/src/helpers/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomPagination({
  data,
  limit,
  setLimit,
  onPageChange,
}: {
  data: PaginatedModel<any>;
  limit: number;
  setLimit: (limit: number) => void;
  onPageChange: (pageNumber: number, limit: number) => void;
}) {
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
        onClick={() => page != data.current_page && onPageChange(page, limit)}
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
      onClick={() => onPageChange(data.current_page - 1, limit)}
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
      onClick={() => onPageChange(data.current_page + 1, limit)}
      disabled={data.current_page >= data.last_page}
    >
      <ChevronRight className="text-primary" size={20} />
    </Button>
  );
  pages.push(
    <Select
      onValueChange={(e) => {
        setLimit(Number(e));
        onPageChange(1, Number(e));
      }}
    >
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder={limit} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return pages;
}

export default CustomPagination;
