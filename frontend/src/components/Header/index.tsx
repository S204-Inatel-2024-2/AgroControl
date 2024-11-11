import React, { useState, useEffect } from "react";
import { RxExit } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container, LogOut, Menu, Title, UserText } from "./styles";
import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    const storedUserName = localStorage.getItem("user");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <>
      <Sidebar isOpen={showSidebar} />
      <Container className={location.pathname === '/home' ? 'home' : ''}>
        <Menu>
          <GiHamburgerMenu size={32} color="#333333" onClick={() => setShowSidebar(!showSidebar)} />
          <Title>AgroControl</Title>
        </Menu>
        <LogOut>
          <UserText>Olá, {userName || "user"}</UserText>
          <RxExit size={32} color="#333333" onClick={() => navigate('/')} />
        </LogOut>
      </Container>
    </>

  );
}
