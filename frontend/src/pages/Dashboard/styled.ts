import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 120px;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;


export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`