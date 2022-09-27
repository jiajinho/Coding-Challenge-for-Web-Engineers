import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import locale from 'locale';
import config from 'config';
import MightyJaxx, { Wrapper as $MightyJaxx } from 'components/common/svg/MightyJaxx';

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  background: white;
  padding: 10px var(--page-h-padding);
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 1px 6px 1px #0001;

  ${$MightyJaxx} { 
    flex-shrink: 0;
    width: 60px;
  }
`;

const Username = styled.p`
  flex-grow: 1;
  font-weight: bold;
  margin-right: 5px;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
`;

const Divider = styled.div`
  flex-shrink: 0;
  margin: 0 5px;

  height: 25px;
  width: 1px;
  background: #ddd;
`;

const Logout = styled.button`
  padding: 5px;
  border: none;
  outline: none;

  background: inherit;
  cursor: pointer;
  transition: 0.25s color;

  &:hover { color: var(--primary-color) }
`;

export default () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem(config.localStorage.key.username)!);
    }
  }, [typeof window]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  }

  const handleLogoClick = () => {
    window.open("https://mightyjaxx.com/", "_blank");
  }

  return (
    <Wrapper>
      <MightyJaxx onClick={handleLogoClick} />

      <Username>
        {username}
      </Username>

      <Divider />

      <Logout onClick={handleLogout}>
        {locale.dashboard.header.logout}
      </Logout>
    </Wrapper>
  );
}