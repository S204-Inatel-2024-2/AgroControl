import styled from "styled-components";

export const StyledModal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 100%; 
  margin-top: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0; 
  color: #333; 
`;

export const ModalBody = styled.div`
  margin-top: 20px;
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ffdb59;
    outline: none; 
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-top: 20px;
`;

export const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: #333;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundButton};
  }
`;

export const EmployeeItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
