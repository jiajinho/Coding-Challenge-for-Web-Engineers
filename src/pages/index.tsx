import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import locale from 'locale';
import config from 'config';
import api from 'api';
import useForm from 'hooks/common/useForm';
import { writeUserLocal } from 'utils';

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
  const router = useRouter();

  const [form, setForm] = useForm({
    email: "admin@email.com",
    password: "1234",
    errEmail: false,
    errPassword: false
  });

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (form.errEmail) return;
    if (form.errPassword) return;

    try {
      const result = await api.user.login(form.email, form.password);

      writeUserLocal(result);
      toast.success("Login successful");

      router.push("/dashboard");
    } catch (e) { }
  }

  return (
    <Wrapper>

      <Form>
        <Logo>
          <MightyJaxx />
          <p>{locale.login.title}</p>
        </Logo>

        <Input
          label={locale.login.form.email}
          value={form.email}
          onChange={s => setForm({ email: s })}
          onError={e => setForm({ errEmail: !!e })}
          validations={[
            { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField },
            { regex: config.regex.email, errMessage: locale.validation.notInEmailFormat }
          ]}
        />

        <Input
          label={locale.login.form.password}
          value={form.password}
          type="password"
          onChange={s => setForm({ password: s })}
          onError={e => setForm({ errPassword: !!e })}
          validations={[
            { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField }
          ]}
        />

        <Button onClick={handleLogin}>
          {locale.login.form.submit}
        </Button>
      </Form>
    </Wrapper>
  );
}
