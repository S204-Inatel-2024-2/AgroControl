import styled from 'styled-components';

export const Th = styled.td`
  width: 'auto';
  color: #333333;
  border: 5px solid #ffffff;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
`;


export const Td = styled.td`
  width: 'auto';
  color: #333333;
  border: 5px solid #ffffff;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
`;

export const Tr = styled.tr`
 
`;
