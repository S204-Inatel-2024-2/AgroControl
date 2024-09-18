import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 140px 20px 0px 20px;
  gap: 20px;
`;

export const DivHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const DivButtonn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

export const DivTable = styled.div`
  height: 540px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.textOnClick};
  font-size: 20px;
  font-weight: 700;
`;

export const Text = styled.div`
  color: #000000;
  font-size: 15px;
  font-weight: 550;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  gap: 5px;
  svg{
    font-size: 17px;
  }
`;

export const Input = styled.input`
  height: 30px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.placeholderInput};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.backgroundInput};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderInput};
    opacity: 1;
  }
`;

export const Button = styled.button`
  width: 180px;
  height: 40px;
  padding: 8px 16px;
  color: #000000;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 550;
  cursor: pointer;
 // margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundButton};

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;