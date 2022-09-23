import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import type { Column, Object } from './types';
import Pagination from './Pagination';

export const Table = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
`;

export const Row = styled.div(({ $gridWidth }: { $gridWidth: string }) => `
  display: grid;
  grid-template-columns: ${$gridWidth};
`);

export const Header = styled(Row)`
  font-weight: bold;
  align-items: center;
  border-bottom: 1px solid;
  border-color: #ccc;
`;

export const Cell = styled.div`
  padding: 10px;
  white-space: pre;
`;

export default <T extends Object>({ data, columns, pageSize }: {
  data: T[],
  columns: Column<T>[],
  pageSize: number
}) => {
  /**
   * Hooks
   */
  const [currentPage, setCurrentPage] = useState(1);

  const gridWidth = useMemo(() => {
    let width = "";
    columns.forEach(v => { width = `${width} ${v.width ?? "1fr"}` });

    return width;
  }, [columns.length]);

  /**
   * Not hook
   */
  const index = {
    start: (currentPage - 1) * pageSize,
    end: (currentPage - 1) * pageSize + pageSize
  };

  /**
   * Render
   */
  return (
    <div>
      <Table>
        <Header $gridWidth={gridWidth}>
          {columns.map((c, i) =>
            <Cell key={i}>
              {c.title}
            </Cell>
          )}
        </Header>

        {data.slice(index.start, index.end).map((d, i) =>
          <Row key={i} $gridWidth={gridWidth}>
            {columns.map((c, j) =>
              <Cell key={j}>
                {c.render(d)}
              </Cell>
            )}
          </Row>
        )}
      </Table>

      <Pagination
        totalCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onBoxClick={setCurrentPage}
      />
    </div>
  );
}