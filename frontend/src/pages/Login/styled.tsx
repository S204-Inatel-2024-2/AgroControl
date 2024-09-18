import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const DivInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  z-index: 1;
  width: 35%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  opacity: 0.95;
`;

export const DivImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (max-width: 900px) {
    width: 0%;
    height: 0%;
  }
`;

export const divButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

export const Title = styled.h1`
  font-size: 35px;
  margin: 0px 0px 20px 0px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

export const Text1 = styled.div`
  font-size: 13px;
  cursor: pointer;
  color:  ${({ theme }) => theme.colors.text};
`;

export const RecoverPassword = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
  font-size: 13px;
  gap: 5px;
  cursor: pointer;
  color:  ${({ theme }) => theme.colors.text};
  .textOnClick{
    color:  ${({ theme }) => theme.colors.textOnClick};
  }
`;

export const Text2 = styled.div`
  font-size: 12px;
  cursor: pointer;
  color:  ${({ theme }) => theme.colors.text};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 8px;
  width: 70%;
  gap: 5px;
  transition: 0.5s;
  color:  ${({ theme }) => theme.colors.text};
`;

export const InputPassword = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 8px;
  width: 400px;
  gap:5px;
    position: absolute;
  transition: 0.5s;
  color:  ${({ theme }) => theme.colors.text};
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

export const EyeIcon = styled.div`
  position: absolute;
  right: 16%;
  padding: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.placeholderInput};
  font-size: 25px;
`;

export const Button = styled.button`
  width: 140px;
  height: 40px;
  padding: 8px 16px;
  color: #000000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundButton};

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

export const Error = styled.text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const ImageSlider = styled.img`
  width: 90px;
  object-fit: cover;
  opacity:1;
`;
