import { useEffect, useState } from 'react';

export type PageIndex = number | null;

export default ({ page, maxPage, pageSize }: {
  page: [number, (n: number) => void],
  maxPage?: number,
  pageSize: number
}) => {
  const sibling = 1;
  const size = 7;
  const [pages, setPages] = useState<PageIndex[]>([]);

  useEffect(() => {
    if (maxPage !== undefined) {
      let startPage = 0;
      let endPage = 0;


      if (maxPage <= size) {
        startPage = 0;
        endPage = maxPage;
      }
      else if (page[0] <= (sibling + 1)) {
        startPage = 0;
        endPage = 2 * sibling + 2;
      }
      else if (page[0] >= maxPage - (sibling + 2)) {
        startPage = maxPage - (2 * sibling) - 2;
        endPage = maxPage;
      }
      else {
        startPage = page[0] - sibling;
        endPage = page[0] + sibling;
      }


      const list: PageIndex[] = [];

      if (startPage > 0) list.push(0);
      if (startPage > 1) list.push(null);

      for (let i = startPage; i <= endPage; i++) {
        list.push(i);
      }

      if (endPage < maxPage - 1) list.push(null);
      if (endPage < maxPage) list.push(maxPage);


      setPages(list);
    }
  }, [page[0], maxPage]);

  return pages;
}