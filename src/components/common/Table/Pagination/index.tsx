import React from 'react';
import styled from 'styled-components';

import CaretDown, { Wrapper as $CaretDown } from 'components/common/svg/CaretDown';
import usePagination, { delimiter } from './usePagination';

export const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: end;
  gap: 5px;
`;

const Box = styled.div(({ $active = false }: { $active?: boolean }) => `
  padding: 5px 0;
  width: 30px;

  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: 0.25s border-color;

  &:hover { border-color: var(--primary-color, red) }

  ${$active ? `
  border-color: var(--primary-color, red);
  border-width: 2px;
  color: white;
  background: var(--primary-color, red);
  font-weight: 600;
  ` : ''}
`);

const InertBox = styled(Box)`
  border-color: transparent;
  cursor: auto;

  &:hover { border-color: transparent }
`;

const CaretBox = styled(InertBox)(({ $disabled = false }: { $disabled?: boolean }) => `
  cursor: ${$disabled ? 'not-allowed' : 'pointer'};
  ${$CaretDown} { width: 13px }
`);

function clamp(min: number, max: number, value: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export default ({ totalCount, pageSize, currentPage, onBoxClick }: {
  totalCount: number,
  pageSize: number,
  currentPage: number
  onBoxClick: (n: number) => void
}) => {
  /**
   * Hooks
   */
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage
  });

  /**
   * Not hook
   */
  const maxPage = Math.ceil(totalCount / pageSize);

  const caretColor = "var(--primary-color, red)";

  /**
   * Render
   */
  return (
    <Wrapper>
      {/**Left arrow */}
      <CaretBox
        $disabled={currentPage === 1}
        onClick={() => onBoxClick(clamp(1, maxPage, currentPage - 1))}
      >
        <CaretDown
          color={caretColor}
          direction="left"
        />
      </CaretBox>

      {/**Pagination boxes */}
      {paginationRange?.map((item, i) => item.toString() === delimiter ?
        (<InertBox key={i}>
          {item}
        </InertBox>)
        :
        (<Box
          key={i}
          onClick={() => onBoxClick(item as number)}
          $active={currentPage === item}
        >
          {item}
        </Box>)
      )}

      {/**Right arrow */}
      <CaretBox
        $disabled={currentPage === maxPage}
        onClick={() => onBoxClick(clamp(1, maxPage, currentPage + 1))}
      >
        <CaretDown
          color={caretColor}
          direction="right"
        />
      </CaretBox>
    </Wrapper>
  );
}