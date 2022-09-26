import React, { useEffect } from 'react';
import styled from 'styled-components';

import Box from './Box';
import usePagination from './usePagination';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default ({ max, pageSize, page }: {
  max?: number,
  pageSize: number,
  page: [number, (n: number) => void]
}) => {
  let maxPage = max ? Math.trunc(max / pageSize) : undefined;

  if (max && maxPage && max % pageSize === 0) {
    maxPage--;
  }

  const pages = usePagination({ page, maxPage, pageSize });

  useEffect(() => {
    if (typeof maxPage === "number" && page[0] > maxPage) {
      page[1](maxPage);
    }
  }, [page[0], max]);

  const handleBoxClick = (index: number) => {
    page[1](index);
  }

  return (
    <Wrapper>
      {typeof maxPage === "number" ? pages.map((item, i) =>
        <Box
          key={i}
          onClick={item !== null ? () => handleBoxClick(item) : undefined}
          active={page[0] === item}
        >
          {item === null ? '...' : item + 1}
        </Box>
      ) : ''}
    </Wrapper>
  );
}