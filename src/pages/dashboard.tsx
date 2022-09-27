import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import api from 'api';
import config from 'config';
import type { Product } from 'api/product';
import { escapeSpecialChar } from 'utils';

import Pagination from 'components/common/Pagination';
import Header from 'components/dashboard/Header';
import UpsertModal from 'components/dashboard/UpsertModal';
import ProductCard from 'components/dashboard/ProductCard';
import DeleteModal from 'components/dashboard/DeleteModal';
import EmptyProduct from 'components/dashboard/EmptyProduct';
import Toolbar from 'components/dashboard/Toolbar';
import LoadingMask, { Wrapper as $LoadingMask } from 'components/common/LoadingMask';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 20px var(--page-h-padding);
  padding-bottom: 40px;

  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (min-width: ${config.viewport.md}) {
    flex-direction: row;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }
`;

const FirstLoad = styled.div`
  position: relative;
  height: 200px;
  width: 100%;

  ${$LoadingMask} { background: transparent }
`;

export default () => {
  /**
   * Hooks
   */
  const [firstLoad, setFirstLoad] = useState(true);
  const query = useQuery(api.product.baseUrl, api.product.get);

  const [page, setPage] = useState(0);
  const [item, setItem] = useState<Product>();

  const modalVisible = {
    upsert: useState(false),
    delete: useState(false)
  }

  const [filterTitle, setFilterTitle] = useState("");

  useEffect(() => {
    if (query.data !== undefined) {
      setFirstLoad(false);
    }
  }, [query]);

  /**
   * Not hook
   */
  const handleAdd = () => {
    setItem(undefined);
    modalVisible.upsert[1](true);
  }

  const handleDelete = (p: Product) => {
    setItem(p);
    modalVisible.delete[1](true);
  }

  const handleEdit = (p: Product) => {
    setItem(p);
    modalVisible.upsert[1](true);
  }

  const data = query.data?.filter((p) => {
    if (filterTitle === "") return true;

    const regexStr = escapeSpecialChar(filterTitle);

    return new RegExp(regexStr, 'i').test(p.title);
  }) || [];

  const pageStart = page * config.paginationSize;
  const pageEnd = pageStart + config.paginationSize;

  /**
   * Render
   */
  return (
    <Wrapper>
      <Header />

      <Content>
        <Toolbar
          onAdd={handleAdd}
          title={[filterTitle, setFilterTitle]}
        />

        <ProductGroup>
          {firstLoad &&
            <FirstLoad>
              <LoadingMask visible />
            </FirstLoad>
          }

          {!firstLoad && data.length === 0 && <EmptyProduct />}

          {!firstLoad && data.slice(pageStart, pageEnd).map((p, i) => (
            <ProductCard
              key={i}
              data={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ProductGroup>

        <Pagination
          max={data.length || 0}
          pageSize={config.paginationSize}
          page={[page, setPage]}
        />
      </Content>

      <UpsertModal visible={modalVisible.upsert} data={[item, setItem]} />
      <DeleteModal visible={modalVisible.delete} data={[item, setItem]} />
    </Wrapper>
  );
}