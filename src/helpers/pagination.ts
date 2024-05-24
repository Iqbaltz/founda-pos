export interface PaginationLink {
  url: string | null;
  label: string | null;
  active: string | null;
  page?: number | null;
}

export default interface PaginatedModel<T> {
  data: T[];
  links: PaginationLink[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  summary?: number;
}

export const emptyPagination = {
  data: [],
  links: [],
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
};

const convertPaginationLinkToPage = (link: string | null) => {
  if (link) {
    const searchParams = new URLSearchParams(new URL(link).search);
    const pageNumber = searchParams.get("page");
    if (pageNumber) return Number(pageNumber);
  }
  return null;
};
export const extractPaginationLinks = (paginationLinks: PaginationLink[]) => {
  return paginationLinks.map((link) => ({
    ...link,
    page: convertPaginationLinkToPage(link.url),
  }));
};
