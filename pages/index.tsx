import styled from 'styled-components';

import Input from 'components/Input';
import useForm from 'hooks/common/useForm';

const Wrapper = styled.div`

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default () => {
  const { form, setForm } = useForm({
    email: "",
    password: ""
  });

  return (
    <Wrapper>
      <Form>
        <Input
          value={form.email}
          onChange={s => setForm({ email: s })}
        />

        <Input
          value={form.password}
          onChange={s => setForm({ password: s })}
        />
      </Form>
    </Wrapper>
  );
}
