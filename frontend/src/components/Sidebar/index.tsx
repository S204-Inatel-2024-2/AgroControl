import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaChartLine, FaMoneyBillWave, FaUsers, FaHeadset } from 'react-icons/fa'; // Ícones do React Icons
import { MdHomeRepairService } from "react-icons/md";
// Animação de abrir (deslizar da esquerda para a direita)
const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

// Animação de fechar (deslizar da direita para a esquerda)
const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 290px;
  height: 100vh;
  gap: 15px;
  background-color: #FFD54F; /* Cor amarela */
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  padding-top: 125px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s ease-out forwards;
`;

const SidebarItem = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.textOnClick};;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px; 
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: 260px;
  background-color: ${({ theme }) => theme.colors.textOnClick};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
transition: 0.2s;
  &:hover {
    transition: 0.2s;
    background-color: ${({ theme }) => theme.colors.textOnClick};;
  }
`;


type Props<T> = {
  isOpen: boolean;
};

const Sidebar = <T,>({ isOpen }: Props<T>) => {
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        {/* <SidebarItem to="/dashboard-financeiro">
                    <IconWrapper><FaChartLine /></IconWrapper>
                    Dashboard Financeiro
                </SidebarItem> */}
        <SidebarItem to="/home">
          <IconWrapper><FaHome /></IconWrapper>
          Home
        </SidebarItem>
        <SidebarItem to="/finances">
          <IconWrapper><FaMoneyBillWave /></IconWrapper>
          Controle Financeiro
        </SidebarItem>

        <SidebarItem to="/services">
          <IconWrapper><MdHomeRepairService /></IconWrapper>
          Controle de Serviços
        </SidebarItem>
        <SidebarItem to="/employees">
          <IconWrapper><FaUsers /></IconWrapper>
          Gerenciamento de Funcionários
        </SidebarItem>

        <SidebarItem to="/suporte">
          <IconWrapper><FaHeadset /></IconWrapper>
          Suporte
        </SidebarItem>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
