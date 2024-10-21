import React from 'react';
import img from '../../images/image4.jpg'
//styles
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { MdAnalytics, MdHomeRepairService } from 'react-icons/md';
//icons


export function Home(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Styled.Page>
        <Header />
        <Styled.Image src={img} >
          <Styled.DivText>
            <Styled.Title>AgroControl</Styled.Title>
            <Styled.Text>
              Bem-vindo ao AgroControl, sua plataforma completa para o gerenciamento inteligente e eficiente da produção agrícola. Com o AgroControl, você pode monitorar suas plantações, controlar o uso de insumos e otimizar a colheita, tudo em um só lugar.
              <br /><br />
              Nossa solução foi desenvolvida para facilitar o dia a dia do agricultor, fornecendo dados precisos e ferramentas intuitivas que ajudam a aumentar a produtividade e reduzir custos. O AgroControl é seu parceiro para uma agricultura moderna, sustentável e conectada.
              <br /><br />
              Explore nossas funcionalidades e descubra como podemos transformar a gestão de sua propriedade rural!
            </Styled.Text>
          </Styled.DivText>
          <Styled.DivRoute>
            <Styled.Divbutton>
              Dashboard Financeiro
              <Styled.IconWrapper><MdAnalytics /></Styled.IconWrapper>
            </Styled.Divbutton>
            <Styled.Divbutton onClick={() => navigate('/finances')}>
              Controle Financeiro
              <Styled.IconWrapper><FaMoneyBillWave /></Styled.IconWrapper>
            </Styled.Divbutton>
            <Styled.Divbutton onClick={() => navigate('/services')}>
              Gerenciamento de Serviços
              <Styled.IconWrapper><MdHomeRepairService /></Styled.IconWrapper>
            </Styled.Divbutton>
            <Styled.Divbutton onClick={() => navigate('/employees')}>
              Gerenciamento de Funcionários
              <Styled.IconWrapper><FaUsers /></Styled.IconWrapper>
            </Styled.Divbutton>
          </Styled.DivRoute>
        </Styled.Image>
      </Styled.Page>
    </>
  );
}
