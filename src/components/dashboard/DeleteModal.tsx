import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import api from 'api';
import { Product } from 'api/product';

import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import locale from 'locale';
import LoadingMask from 'components/common/LoadingMask';

const Wrapper = styled.div`
  position: relative;

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      await mutation.mutateAsync(data[0]._id);

      toast.success(locale.dashboard.deleteModal.success.replace("{{ 1 }}", data[0].sku));

      data[1](undefined);
      visible[1](false);
    }
    catch (e) { }
    finally { setLoading(false) }
  }

  /**
   * Render
   */
  return (
    <Modal visible={visible}>
      <Wrapper>
        <LoadingMask visible={loading} />

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