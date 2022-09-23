import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from 'api';
import type { Product } from 'api/product';

import Table, { Table as $Table } from 'components/common/Table';
import Button from 'components/common/Button';
import Header from 'components/dashboard/Header';
import CreateModal from 'components/dashboard/CreateModal';
import Image from 'next/image';
import ProductCard from 'components/dashboard/ProductCard';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 10px var(--page-h-padding);

  ${$Table} { grid-template-rows: 70px }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  height: 100px;
  width: auto;
`;


export default () => {
  const [products, setProducts] = useState<Product[]>([]);

  const modalVisible = {
    create: useState(true)
  }

  useEffect(() => {
    (async () => {
      const products = await api.product.get();
      setProducts(products);
    })();
  }, []);

  const AddButton = () => (
    <Button onClick={() => modalVisible.create[1](true)}>
      Add
    </Button>
  )

  return (
    <Wrapper>
      <Header />

      <Content>
        {products.map(p => <ProductCard {...p} />)}

        {/* <Table
          data={products}
          pageSize={10}
          columns={[
            {
              title: "Image",
              render: r => (
                <ImageContainer>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={r.imageB64 || ""}
                  />
                </ImageContainer>
              ),
              width: "110px"
            },
            {
              title: "SKU",
              render: r => r.sku,
              width: "100px"
            },
            {
              title: 'Title',
              render: r => r.title,
              width: "100px"
            },
            {
              title: "Description",
              render: r => r.description || "-"
            },
            {
              title: <AddButton />,
              render: () => <button>Edit</button>,
              width: "100px"
            }
          ]}
        /> */}
      </Content>

      <CreateModal visible={modalVisible.create} />
    </Wrapper>
  );
}