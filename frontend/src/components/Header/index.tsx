import React from "react";
import { RxExit } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container, LogOut, Menu, Title, UserText } from "./styles";

export function Header(): JSX.Element {
  return (
    <Container>
      <Menu>
        <GiHamburgerMenu size={32} color="#333333" />
        <Title>AgroControl</Title>
      </Menu>
      <LogOut>
        <UserText>Olá, User</UserText>
        <RxExit size={32} color="#333333" />
      </LogOut>
    </Container>
  );
}
