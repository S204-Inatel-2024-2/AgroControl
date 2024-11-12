import styled from 'styled-components';

interface ImageProps {
  src?: string;  // Propriedade opcional
}

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 // width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden; /* Permite rolar verticalmente */
  
  /* Estilo da barra de rolagem no Chrome e Safari */
  &::-webkit-scrollbar {
    display: none; /* Esconde a barra de rolagem */
  }
  @media (max-width: 800px) {
    //padding: 10px 26px;
    gap: 50px;
  }
`;

/* export const Image = styled.div`
  img{
    width: 300px;
  }
`; */

export const Image = styled.div<ImageProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to top right,
    #FDECEF 15%, /* Deixa o canto inferior esquerdo mais escuro */
      rgba(0, 0, 0, 0) 60%    /* Transparente no canto superior direito */
    ), url(${props => props.src || '/default-image.jpg'});
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 800px) {
    background-image: linear-gradient(
    to top right,
    #FDECEF 15%, /* Deixa o canto inferior esquerdo mais escuro */
      rgba(0, 0, 0, 0) 70%    /* Transparente no canto superior direito */
    ), url(${props => props.src || '/default-image.jpg'});
  }
`;


export const Container = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-around;
   z-index: 2;
`;

export const DivText = styled.div`
    max-width: 600px;
    //height: 100%;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    z-index: 2;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 120px 90px;
   @media (max-width: 800px) {
    padding: 120px 20px;
    width: 90%;
    height: 600px;
  }
`;

export const DivRoute = styled.div`
    max-width: 600px;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    display: grid;
    grid-template-columns: auto auto;
    align-content: center;
    justify-items: center;
    justify-content: center;
    align-items: center;
    gap: 30px;
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column
  }
`;

export const Divbutton = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 30px;
  background-color: #FDECEF;
  opacity: 0.8;
  cursor: pointer;
  transition: 0.3s ease; 
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  &:hover {
    background-color: #f0a63b;
    opacity: 1;
    z-index: 1;
  }
  @media (max-width: 1380px) {
    width: 140px;
    height: 140px;
    font-size: 12px;
  }
  @media (max-width: 960px) {
    width: 140px;
    height: 70px;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 10px;
  svg{
    font-size: 70px;
    @media (max-width: 1380px) {
      font-size: 32px;
    }
  }
`;

export const Title = styled.div`
  font-size: 40px;
  margin: 0px 0px 30px 0px;
  font-weight: 600;
  color: #3a3a3a;
  @media (max-width: 960px) {
    display: none;
  }
  @media (max-width: 800px) {
    margin: 0px 0px 20px 0px;
  }
  @media (max-width: 500px) {
    margin: 0px 0px 20px 0px;
  }
`;

export const SubTitle = styled.div`
  font-size: 30px;
  margin: 30px 0px;
  :hover{
    color: #f0a63b; 
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const Text = styled.div`
  font-size: 20px;
  margin: 20PX 0px;
  font-weight: 400;
  color: #333333 ;
  width: 100%;
  @media (max-width: 900px) {
   font-size: 17px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    color: black;
    //padding: 0px 10px;
  }
  a{
    border-bottom: 1px dashed #f0a63b; // #f3b755; //#F27100
    color: #f0a63b; // #f3b755; //#F27100
    text-decoration: none;
  }
`;

export const DivIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 60px;
`;

export const Icon = styled.div`
  cursor: pointer;
  a{
    color: #8899a6;
    cursor: pointer;
    transition: 0.5s;
    :hover{
      transition: 0.5s;
      color: #f0a63b; // #f3b755; //#F27100
    }
  }
  svg{
    font-size: 30px;
  }
`;
