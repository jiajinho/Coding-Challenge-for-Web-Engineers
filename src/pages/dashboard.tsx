import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from 'api';
import type { Product } from 'api/product';

import Button from 'components/common/Button';
import Header from 'components/dashboard/Header';
import CreateModal from 'components/dashboard/CreateModal';
import ProductCard from 'components/dashboard/ProductCard';
import DeleteModal from 'components/dashboard/DeleteModal';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 20px var(--page-h-padding);
`;

const Toolbar = styled.div`
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


export default () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [item, setItem] = useState<Product>();

  const modalVisible = {
    create: useState(false),
    delete: useState(false)
  }

  useEffect(() => {
    (async () => {
      const products = await api.product.get();
      setProducts(products);
    })();
  }, []);

  const handleDelete = (p: Product) => {
    setItem(p);
    modalVisible.delete[1](true);
  }

  return (
    <Wrapper>
      <Header />

      <Content>
        <Toolbar>
          <h1>Product List</h1>

          <Button onClick={() => modalVisible.create[1](true)}>
            Add
          </Button>
        </Toolbar>

        <ProductGroup>
          {products.map((p, i) => (
            <ProductCard
              key={i}
              data={p}
              onDelete={handleDelete}
            />
          ))}
        </ProductGroup>
      </Content>

      <CreateModal visible={modalVisible.create} />
      <DeleteModal visible={modalVisible.delete} data={[item, setItem]} />
    </Wrapper>
  );
}