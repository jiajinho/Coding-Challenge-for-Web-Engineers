import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import api from 'api';
import config from 'config';
import { Product } from 'api/product';
import useForm from 'hooks/common/useForm';

import Modal from 'components/common/Modal';
import Input from 'components/common/Input';
import UploadImage, { Wrapper as $UploadImage } from 'components/common/UploadImage';
import Button from 'components/common/Button';
import locale from 'locale';

const Wrapper = styled.div`
  width: 70vw;
  max-width: 300px;
`;

const Header = styled.header`
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const Form = styled.form`
  padding-top: 10px;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 15px;

  ${$UploadImage} { align-self: center }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;

  display: flex;
  gap: 15px;

  & > * { flex-grow: 1 }
`;

export default ({ visible, data }: {
  visible: [boolean, (b: boolean) => void],
  data: [Product | undefined, (p?: Product) => void]
}) => {
  /**
   * Hooks
   */
  const queryClient = useQueryClient();

  const mutateInsert = useMutation(api.product.post, {
    onSuccess: () => { queryClient.invalidateQueries(api.product.baseUrl) }
  });

  const mutateUpdate = useMutation(api.product.put, {
    onSuccess: () => { queryClient.invalidateQueries(api.product.baseUrl) }
  })

  const [form, setForm] = useForm({
    imageB64: "",
    sku: "",
    title: "",
    description: "",

    errSku: true,
    errTitle: true
  });

  useEffect(() => {
    if (data[0]) {
      setForm({
        imageB64: data[0].imageB64 || "",
        sku: data[0].sku,
        title: data[0].title,
        description: data[0].description || "",
        errSku: false,
        errTitle: false
      });
    }

    return () => { clearForm() }
  }, [data[0]]);

  /**
   * Not hook
   */
  const editMode = !!data[0];

  const clearForm = () => {
    setForm({
      imageB64: "",
      sku: "",
      title: "",
      description: "",

      errSku: true,
      errTitle: true
    });
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (form.errSku) { return; }
    if (form.errTitle) { return; }

    try {
      if (!editMode) {
        await mutateInsert.mutateAsync({ ...form });

        toast.success(locale.dashboard.upsertModal.success.add);
        visible[1](false);

        clearForm();
      }
      else {
        await mutateUpdate.mutateAsync({
          _id: data[0]!._id,
          ...form
        });

        toast.success(locale.dashboard.upsertModal.success.edit);
        visible[1](false);

        clearForm();
      }
    } catch (e) { }
  }

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (data[0]) {
      setForm({
        imageB64: data[0].imageB64 || "",
        sku: data[0].sku,
        title: data[0].title,
        description: data[0].description || "",

        errSku: false,
        errTitle: false
      });
    }
  }

  /**
   * Render
   */
  return (
    <Modal visible={visible}>
      <Wrapper>
        <Header>
          <h2>
            {!editMode ?
              locale.dashboard.upsertModal.title.add :
              locale.dashboard.upsertModal.title.edit.replace("{{ 1 }}", data[0]!.sku)
            }
          </h2>
        </Header>

        <Form>
          <UploadImage
            value={form.imageB64}
            onChange={b64 => setForm({ imageB64: b64 })}
          />

          <Input
            label={locale.dashboard.upsertModal.form.sku}
            value={form.sku}
            onChange={s => setForm({ sku: s })}
            onError={e => setForm({ errSku: !!e })}
            disabled={editMode}
            validations={[
              { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField }
            ]}
          />

          <Input
            label={locale.dashboard.upsertModal.form.title}
            value={form.title}
            onChange={s => setForm({ title: s })}
            onError={e => setForm({ errTitle: !!e })}
            validations={[
              { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField }
            ]}
          />

          <Input
            label={locale.dashboard.upsertModal.form.description}
            value={form.description}
            onChange={s => setForm({ description: s })}
          />

          <ButtonGroup>
            <Button onClick={handleSubmit}>
              {locale.dashboard.upsertModal.form.submit}
            </Button>

            {editMode &&
              <Button.Ghost onClick={handleReset}>
                {locale.dashboard.upsertModal.form.reset}
              </Button.Ghost>
            }
          </ButtonGroup>
        </Form>
      </Wrapper>
    </Modal>
  )
}