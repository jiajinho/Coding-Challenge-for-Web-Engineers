import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import api from 'api';
import config from 'config';
import type { Product } from 'api/product';

import Button from 'components/common/Button';
import Header from 'components/dashboard/Header';
import UpsertModal from 'components/dashboard/UpsertModal';
import ProductCard from 'components/dashboard/ProductCard';
import DeleteModal from 'components/dashboard/DeleteModal';
import Pagination from 'components/common/Pagination';
import EmptyBox, { Wrapper as $EmptyBox } from 'components/common/svg/EmptyBox';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 20px var(--page-h-padding);

  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (min-width: ${config.viewport.md}) {
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const EmptyProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: 0.4;

  h4 { font-weight: 500 }

  ${$EmptyBox} { width: 200px }
`;


export default () => {
  /**
   * Hooks
   */
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(0);
  const [item, setItem] = useState<Product>();

  const modalVisible = {
    upsert: useState(false),
    delete: useState(false)
  }

  useEffect(() => {
    (async () => {
      const products = await api.product.get();
      setProducts(products);
    })();
  }, []);

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

  const pageStart = page * config.paginationSize;
  const pageEnd = pageStart + config.paginationSize;

  /**
   * Render
   */
  return (
    <Wrapper>
      <Header />

      <Content>
        <Toolbar>
          <h1>Product List</h1>

          <Button onClick={handleAdd}>
            Add
          </Button>
        </Toolbar>

        <ProductGroup>
          {products.length === 0 &&
            <EmptyProduct>
              <EmptyBox />
              <h4>Product list is empty!</h4>
              <h4>Try adding one by clicking the add button above.</h4>
            </EmptyProduct>
          }

          {products.slice(pageStart, pageEnd).map((p, i) => (
            <ProductCard
              key={i}
              data={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ProductGroup>

        <Pagination
          max={products.length}
          pageSize={config.paginationSize}
          page={[page, setPage]}
        />
      </Content>

      <UpsertModal visible={modalVisible.upsert} data={[item, setItem]} />
      <DeleteModal visible={modalVisible.delete} data={[item, setItem]} />
    </Wrapper>
  );
}