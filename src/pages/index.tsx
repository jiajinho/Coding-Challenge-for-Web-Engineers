import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import locale from 'locale';
import config from 'config';
import api from 'api';
import useForm from 'hooks/common/useForm';
import { validateForm, writeUserLocal } from 'utils';

import Input from 'components/common/Input';
import Button, { Wrapper as $Button } from 'components/common/Button';
import MightyJaxx, { Wrapper as $MightyJaxx } from 'components/common/svg/MightyJaxx';
import LoadingMask from 'components/common/LoadingMask';

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
  position: relative;
  overflow: hidden;

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
  /**
   * Hooks
   */
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useForm({
    email: "",
    password: ""
  });

  const [form, setForm] = useForm({
    email: "",
    password: "",
  });

  //Check if auth token exist in local storage, if yes then call API to validate directly and login
  useEffect(() => {
    if (typeof window === "undefined") return;

    const authToken = localStorage.getItem(config.localStorage.key.authToken);
    if (!authToken) return;

    (async () => {
      try {
        const result = await api.user.auth();

        writeUserLocal(result);
        toast.success(locale.login.success);
        router.push("/dashboard");
      } catch (e) {
        localStorage.clear();
      }
    })();
  }, [typeof window !== "undefined"]);

  /**
   * Not hook
   */
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    //Validation
    const errors = validateForm(form, {
      email: [
        { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField },
        { regex: config.regex.email, errMessage: locale.validation.notInEmailFormat }
      ],
      password: [
        { regex: config.regex.atLeastOneChar, errMessage: locale.validation.emptyField }
      ]
    });

    setError(errors);
    if (errors.email || errors.password) return;

    //Call API
    setLoading(true);

    try {
      const result = await api.user.login(form.email, form.password);

      writeUserLocal(result);
      toast.success(locale.login.success);
      router.push("/dashboard");
    }
    catch (e) { }
    finally { setLoading(false); }
  }

  /**
   * Render
   */
  return (
    <Wrapper>

      <Form>
        <LoadingMask visible={loading} />

        <Logo>
          <MightyJaxx />
          <p>{locale.login.title}</p>
        </Logo>

        <Input
          label={locale.login.form.email}
          value={form.email}
          onChange={s => setForm({ email: s })}
          error={error.email}
        />

        <Input
          label={locale.login.form.password}
          value={form.password}
          type="password"
          onChange={s => setForm({ password: s })}
          error={error.password}
        />

        <Button onClick={handleLogin}>
          {locale.login.form.submit}
        </Button>
      </Form>
    </Wrapper>
  );
}
