import styled, { keyframes } from "styled-components";

const backgroundAnimation = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: #f5c400;
  }
`;

const backgroundNoneAnimation = keyframes`
  from {
    background-color: #f5c400;
  }
  to {
    background-color: transparent;
  }
`;

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0px;
  left: 0px;
  height: 100px;
  width: 100%;
  background-color: #f5c400;
  z-index: 3;
  padding: 0 16px;
  box-sizing: border-box;
  animation: ${backgroundAnimation} 0.8s ease-out forwards;
  transition: background-color 0.5s;

  &.home {
    animation: ${backgroundNoneAnimation} 0.8s ease-out forwards;
    transition: background-color 0.5s;
  }

  @media (max-width: 768px) {
    height: 80px;
    padding: 0 8px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 50px; /* Espaço entre o ícone do menu e o título */
  padding-left: 56px;
  gap: 30px; /* Espaço entre o ícone do menu e o título */

  svg{
    cursor: pointer;
  }
  @media (max-width: 768px) {
    gap: 15px;
    width: 100%;
    justify-content: space-between;
  }
`;

export const Title = styled.text`
  font-size: 24px;
  font-weight: bolder;
  color: #333333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const LogOut = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* Espaço entre a saudação e o ícone de saída */

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
    justify-content: flex-end;
    margin-top: 10px;
  }
`;

export const UserText = styled.text`
  font-weight: bolder;
  color: #333333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
