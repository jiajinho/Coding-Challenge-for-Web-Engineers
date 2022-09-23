import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from 'api';
import type { Product } from 'api/product';

import Table from 'components/common/Table';
import Button from 'components/common/Button';
import Header from 'components/dashboard/Header';
import CreateModal from 'components/dashboard/CreateModal';

const Wrapper = styled.div`
  height: 100%;
`;

const Content = styled.section`
  padding: 10px var(--page-h-padding);
`;


export default () => {


  const modalVisible = {
    create: useState(true)
  }

  const AddButton = () => (
    <Button onClick={() => modalVisible.create[1](true)}>
      Add
    </Button>
  )

  return (
    <Wrapper>
      <Header />

      <Content>
        <Table
          data={[] as Product[]}
          pageSize={10}
          columns={[
            // {
            //   title: "Image",
            //   render: r => r.image
            // },
            {
              title: 'Title',
              render: r => r.title
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
        />
      </Content>

      <CreateModal visible={modalVisible.create} />
    </Wrapper>
  );
}