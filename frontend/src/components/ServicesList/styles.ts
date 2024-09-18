import styled from 'styled-components';

export const Container = styled.div`
    padding-left: 3%;
    padding-right: 3%;
    //background-color: #f5c400;
`;
export const Form = styled.form`
  
`
export const Title = styled.text`
    font-size: 20px;
    font-weight: bolder;
    color: #de8400;
    //position: absolute;
    
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
  
  margin-left: auto;
  height: 30px;
  width: 800px;
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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  
`
