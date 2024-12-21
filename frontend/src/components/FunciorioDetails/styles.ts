import styled from "styled-components";

export const Container = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-left: 2%;
    padding-right: 2%;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bolder;
  color: #de8400;
  margin: 20px 0 30px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 15px 0;
  }
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 5px 0;
`;

export const Label = styled.span`
  font-weight: bold;
  align-items: center;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 15px 0;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border: 1px solid ${({ theme }) => theme.colors.backgroundInput};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Button = styled.button`
  width: auto;
  height: 40px;
  padding: 8px 16px;
  font-weight: 700;
  color: #333333;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  margin-left: 15px;
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

export const LeftButtons = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const RightButton = styled.div`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
`;

export const Loading = styled.div`
  color: ${({ theme }) => theme.colors.info};
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;
