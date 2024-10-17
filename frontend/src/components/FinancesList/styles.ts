import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 18vh;
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.text`
    font-size: 20px;
    font-weight: bolder;
    color: #de8400;
  
    
`

export const InputDiv = styled.div`
  padding-top: 5px;
  width: 70%;
  
`
export const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  padding-top: 2%;
  gap:5px;
  position:relative;
  transition: 0.5s;
  color:  ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

export const Input = styled.input`
  width: auto;
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

export const TitleDiv = styled.div`
  padding-left: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3%;

`

export const Button = styled.button`
  width: auto;
  height: 30px;
  padding: 8px 50px;
  font-weight: 700;
  color: #333333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  margin-right: 15px;
  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  align-items: center;
`

export const Error = styled.text`
  color: ${({ theme }) => theme.colors.danger};
  position: absolute;
  right: 10px;
  font-size: 12px;
  
`

export const ObservacaoInput = styled.textarea`
  margin-left: auto;
  min-height: 150px;
  width: 745px;
  resize: none;
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
`
export const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px; 
  width: 100%; 
  padding-top: 10px; 
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 0px 20px;
  gap: 20px;
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

