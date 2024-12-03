import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 14px solid #f3f3f3;
  border-top: 14px solid #ffbd59;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
