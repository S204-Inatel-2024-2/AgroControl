import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 0px 0px 0px;
`;

export const Header = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f5c400;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 50px; /* Espaço entre o ícone do menu e o título */
  padding-left: 56px;
`;

export const Exit = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* Espaço entre a saudação e o ícone de saída */
  padding-right: 56px;
`;

export const Title = styled.h1`
  font-size: 40px;
  color: #333333;
`;

export const Greeting = styled.p`
  font-weight: bold;
  color: #333333;
`;

export const Body = styled.div`
  margin-top: 84px;
  background-color: #fcfcfc;
  padding: 12px 40px;
  height: 100%;
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 16px 0 16px;
  h2 {
    color: #de8400;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 20px;
`;

export const LabelData = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  gap: 20px;
  font-weight: bold;
  color: #333333;
`;

export const InputData = styled.input`
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  border: 2px solid;
  background-color: #fff4e3;
  border-color: #d19c26;
  width: 115px;
`;

export const LabelServico = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 8px;
  gap: 10px;
  font-weight: bold;
  color: #333333;
  width: 75%;
`;

export const LabelResponsavel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 8px;
  gap: 10px;
  font-weight: bold;
  color: #333333;
  width: 75%;
`;

export const LabelValor = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  gap: 20px;
  font-weight: bold;
  color: #333333;
`;

export const LabelStatus = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  gap: 20px;
  font-weight: bold;
  color: #333333;
`;

export const LabelObs = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 300px;
  gap: 10px;
  font-weight: bold;
  color: #333333;
  width: 75%;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  border: 2px solid;
  background-color: #fff4e3;
  border-color: #d19c26;
`;

export const InputObs = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 2px solid;
  background-color: #fff4e3;
  border-color: #d19c26;
  font-size: 16px;
  resize: none;
  box-sizing: content-box;

  &::-webkit-scrollbar {
    width: 16px; /* Largura da barra de rolagem */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffd699; /* Cor do thumb (parte da barra que se move) */
    border-radius: 10px; /* Raio da borda do thumb */
    border: 2px solid;
    border-color: #fff1ba;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff1ba; /* Cor da pista da barra de rolagem */
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  color: #333333;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffbd59;
  font-weight: bold;

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }

  &:last-child {
    margin-left: 16px;
  }
`;

export const Select = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  border: 2px solid;
  background-color: #fff4e3;
  border-color: #d19c26;
`;

export const Option = styled.option`
  margin: 12px;
`;
