import React from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import api from 'api';
import { Product } from 'api/product';

import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import locale from 'locale';

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
  /**
   * Hooks
   */
  const queryClient = useQueryClient();

  const mutation = useMutation(api.product.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.product.baseUrl)
    }
  });

  /**
   * Not hook
   */
  const handleDelete = async () => {
    if (!data[0]) return;

    try {
      await mutation.mutateAsync(data[0]._id);

      toast.success(locale.dashboard.deleteModal.success.replace("{{ 1 }}", data[0].sku));

      data[1](undefined);
      visible[1](false);
    } catch (e) { }
  }

  /**
   * Render
   */
  return (
    <Modal visible={visible}>
      <Wrapper>
        <h3>
          {locale.dashboard.deleteModal.title
            .replace("{{ 1 }}", data[0]?.sku || "")
          }
        </h3>

        <p>
          {locale.dashboard.deleteModal.confirmation
            .replace("{{ 1 }}", data[0]?.title || "")
          }
        </p>

        <ButtonGroup>
          <Button onClick={handleDelete}>
            {locale.dashboard.deleteModal.submit}
          </Button>

          <Button.Ghost onClick={() => visible[1](false)}>
            {locale.dashboard.deleteModal.cancel}
          </Button.Ghost>
        </ButtonGroup>
      </Wrapper>
    </Modal>
  )
}