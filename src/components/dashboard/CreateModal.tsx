import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import api from 'api';
import config from 'config';
import useForm from 'hooks/common/useForm';
import { toBase64 } from 'utils';
import { Product } from 'api/product';

import Modal from 'components/common/Modal';
import Input from 'components/common/Input';
import UploadImage, { Wrapper as $UploadImage } from 'components/common/UploadImage';
import Button, { Wrapper as $Button } from 'components/common/Button';

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
  ${$Button} { margin-top: 20px }
`;

type FormSchema = {
  image?: File,
  sku: string,
  title: string,
  description: string,
  errSku: boolean,
  errTitle: boolean
}

export default ({ visible }: {
  visible: [boolean, (b: boolean) => void]
}) => {

  const [form, setForm] = useForm<FormSchema>({
    image: undefined,
    sku: "",
    title: "",
    description: "",

    errSku: true,
    errTitle: true
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (form.errSku) { toast.error("Error"); return; }
    if (form.errTitle) { toast.error("Error"); return; }

    let b64: string | ArrayBuffer | null = null;

    if (form.image) {
      b64 = await toBase64(form.image);
    }

    try {
      await api.product.post({
        imageB64: typeof b64 === "string" ? b64 : null,
        sku: form.sku,
        title: form.title,
        description: form.description || null
      });

      toast.success("Item added successfully");
      visible[1](false);

      setForm({
        image: undefined,
        sku: "",
        title: "",
        description: "",
        errSku: true,
        errTitle: true
      });
    } catch (e) { }
  }

  return (
    <Modal visible={visible}>
      <Wrapper>
        <Header>
          <h2>Add an item</h2>
        </Header>

        <Form>
          <UploadImage
            value={form.image}
            onChange={f => setForm({ image: f })}
          />

          <Input
            label="SKU"
            value={form.sku}
            onChange={s => setForm({ sku: s })}
            onError={e => setForm({ errSku: !!e })}
            validations={[
              { regex: config.regex.atLeastOneChar, errMessage: "Required" }
            ]}
          />

          <Input
            label="Title"
            value={form.title}
            onChange={s => setForm({ title: s })}
            onError={e => setForm({ errTitle: !!e })}
            validations={[
              { regex: config.regex.atLeastOneChar, errMessage: "Required" }
            ]}
          />

          <Input
            label="Description"
            value={form.description}
            onChange={s => setForm({ description: s })}
          />

          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Wrapper>
    </Modal>
  )
}