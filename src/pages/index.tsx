import React from 'react';
import styled from 'styled-components';

import config from 'config';
import useForm from 'hooks/common/useForm';
import Input from 'components/common/Input';
import Button, { Wrapper as $Button } from 'components/common/Button';
import MightyJaxx, { Wrapper as $MightyJaxx } from 'components/common/svg/MightyJaxx';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 var(--page-h-padding);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  ${$MightyJaxx} { width: 130px }

  p {
    max-width: 250px;
    line-height: 18px;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
    color: black;
  }
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

  ${$Button} { margin-top: 20px }
`;

export default () => {
  const [form, setForm] = useForm({
    email: "",
    password: "",
    errEmail: true,
    errPassword: true
  });

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(form);
  }

  return (
    <Wrapper>

      <Form>
        <Logo>
          <MightyJaxx />
          <p>Web Engineer Coding Challenge</p>
        </Logo>

        <Input
          label="Email"
          value={form.email}
          onChange={s => setForm({ email: s })}
          onError={e => setForm({ errEmail: !!e })}
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
          onError={e => setForm({ errPassword: !!e })}
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
