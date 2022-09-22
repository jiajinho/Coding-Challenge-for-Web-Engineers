import React, { useEffect } from 'react';
import styled from 'styled-components';

import api from 'api';
import type { Product } from 'api/product';

import Table from 'components/common/Table';
import Header from 'components/dashboard/Header';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 10px var(--page-h-padding);
`;

export default () => {

  useEffect(() => {
    (async () => {
      const x = await api.product.post();
      console.log(x);
    })();
  }, []);


  // const mockProduct: Product[] = [
  //   { id: '1', image: '2', title: 'title', description: 'sample' },
  //   { id: '2', image: '2', title: 'title2', description: 'sample2' },
  //   { id: '3', image: '2', title: 'title3', description: 'sample3' },
  // ]

  return (
    <Wrapper>
      <Header />

      <Content>
        <Table
          data={[]}
          pageSize={10}
          columns={[
            // {
            //   title: "Id",
            //   render: r => r.id
            // },
            // {
            //   title: "Image",
            //   render: r => r.image
            // },
            // {
            //   title: 'Title',
            //   render: r => r.title
            // },
            // {
            //   title: "Description",
            //   render: r => r.description
            // }
          ]}
        />
      </Content>
    </Wrapper>
  );
}