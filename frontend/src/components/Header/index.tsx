import React, { useState } from "react";
import { RxExit } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container, LogOut, Menu, Title, UserText } from "./styles";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";

export function Header(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const location = useLocation();
  console.log(location)
  return (
    <>
      <Sidebar isOpen={showSidebar} />
      <Container className={location.pathname === '/home' ? 'home' : ''}>
        <Menu>
          <GiHamburgerMenu size={32} color="#333333" onClick={() => setShowSidebar(!showSidebar)} />
          <Title>AgroControl</Title>
        </Menu>
        <LogOut>
          <UserText>Olá, User</UserText>
          <RxExit size={32} color="#333333" />
        </LogOut>
      </Container>
    </>

  );
}
