import React from 'react';
import styled from 'styled-components';

import config from 'config';
import Input from 'components/Input';
import Button from 'components/Button';
import useForm from 'hooks/common/useForm';

const Wrapper = styled.div`
  height: 100%;
  padding: var(--page-padding);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  width: 100%;
  max-width: 450px;
  padding: 25px;
  border-radius: 8px;
  background: var(--bg-alt-color);
`;

export default () => {
  const { form, setForm } = useForm({
    email: "",
    password: "",
    errEmail: false,
    errPassword: false
  });

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(form);
  }

  return (
    <Wrapper>
      <Form>
        <Input
          label="Email"
          value={form.email}
          onChange={s => setForm({ email: s })}
          onError={e => setForm({ errEmail: !(e === true) })}
          validations={[
            { regex: config.regex.atLeastOneChar, errMessage: "Field is required" },
            { regex: config.regex.email, errMessage: 'Field is not in email format' }
          ]}
        />

        <Input
          label="Password"
          value={form.password}
          // type="password"
          onChange={s => setForm({ password: s })}
          onError={e => setForm({ errPassword: !(e === true) })}
          validations={[
            { regex: config.regex.atLeastOneChar, errMessage: "Field is required" }
          ]}
        />

        <Button onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Wrapper>
  );
}
