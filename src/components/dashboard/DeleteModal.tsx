import React from 'react';
import styled from 'styled-components';

import api from 'api';
import Modal from 'components/common/Modal';
import { Product } from 'api/product';
import Button from 'components/common/Button';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  p {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export default ({ visible, data }: {
  visible: [boolean, (b: boolean) => void],
  data: [Product | undefined, (d?: Product) => void]
}) => {
  const handleDelete = async () => {
    if (!data[0]) return;

    try {
      await api.product.delete(data[0]._id);

      toast.success(`${data[0].sku} deleted`);

      data[1](undefined);
      visible[1](false);
    } catch (e) { }
  }

  return (
    <Modal visible={visible}>
      <Wrapper>
        <h3>
          {`Delete #${data[0]?.sku}`}
        </h3>

        <p>
          {`Are you sure you want to delete ${data[0]?.title}?`}
        </p>

        <ButtonGroup>
          <Button onClick={handleDelete}>
            Delete
          </Button>

          <Button.Ghost onClick={() => visible[1](false)}>
            Cancel
          </Button.Ghost>
        </ButtonGroup>
      </Wrapper>
    </Modal>
  )
}