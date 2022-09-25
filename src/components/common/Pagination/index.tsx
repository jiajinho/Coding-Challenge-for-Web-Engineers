import React from 'react';
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
  const maxPage = max ? Math.trunc(max / pageSize) : undefined;

  const pages = usePagination({ page, maxPage, pageSize });

  const handleBoxClick = (index: number) => {
    page[1](index);
  }

  return (
    <Wrapper>
      {pages.map((item, i) =>
        <Box
          key={i}
          onClick={item !== null ? () => handleBoxClick(item) : undefined}
          active={page[0] === item}
        >
          {item === null ? '...' : item + 1}
        </Box>
      )}
    </Wrapper>
  );
}