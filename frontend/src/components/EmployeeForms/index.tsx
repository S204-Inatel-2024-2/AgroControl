import React from 'react';
import * as Styled from './styles';





export function EmployeeForms(): JSX.Element {
  
  return (
    
    <Styled.Container>
        <Styled.TitleDiv>
          <Styled.Title>Cadastro de novo funcionário</Styled.Title>
          <Styled.ButtonDiv>
            <Styled.Button type='submit'>Salvar informações</Styled.Button>
            <Styled.Button type='submit'>Voltar</Styled.Button>
          </Styled.ButtonDiv>
        
        </Styled.TitleDiv>
        
        <Styled.InputDiv>
          <Styled.Label>
              Nome:
              <Styled.Input
                type="text"
                placeholder='Nome'
              />
            </Styled.Label>
            <Styled.Label>
              CPF:
              <Styled.Input
                type="text"
                placeholder='CPF'
              />
            </Styled.Label>
            <Styled.Label>
              Endereço:
              <Styled.Input
                type="text"
                placeholder='Endereço'
              />
            </Styled.Label>

            <Styled.Label>
              Email:
              <Styled.Input
                type="text"
                placeholder='Email'
              />
            </Styled.Label>
            <Styled.Label>
              Função:
              <Styled.Input
                type="text"
                placeholder='Função'
              />
            </Styled.Label>
        </Styled.InputDiv>
        
    </Styled.Container>
    

  );
};