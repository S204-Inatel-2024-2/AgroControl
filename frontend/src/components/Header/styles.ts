import styled from 'styled-components';

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
    z-index: 1;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 50px; /* Espaço entre o ícone do menu e o título */
  padding-left: 56px;
`;

export const Title = styled.text`
    font-size: 30px;
    font-weight: bolder;
    color: #333333;
    position: absolute;
    left: 10%; 
`

export const LogOut = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* Espaço entre a saudação e o ícone de saída */
  padding-right: 56px;
`;

export const UserText = styled.text`
    font-weight: bolder;
    color: #333333;
    position: absolute;
    right: 10%;
`