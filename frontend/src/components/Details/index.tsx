import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFuncionarioById } from '../../service';
import { useNavigate } from 'react-router-dom'; 
import * as Styled from './styles';

interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  email: string;
  funcao: string;
  salario: number;
  observacoes: string;
}

export function EmployeeDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ID do funcionário:', id);

    if (!id) {
      setError('ID do funcionário não foi fornecido.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getFuncionarioById(Number(id));
        setFuncionario(response.data.funcionario); 
      } catch (error) {
        setError('Erro ao carregar os detalhes do funcionário.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Styled.Loading>Carregando...</Styled.Loading>;
  }

  if (error) {
    return <Styled.Error>{error}</Styled.Error>;
  }

  if (!funcionario) {
    return <Styled.Error>Funcionário não encontrado.</Styled.Error>
  }

 const formattedDate = funcionario.dataNascimento ? new Date(funcionario.dataNascimento).toLocaleDateString() : 'Data inválida';

  return (
    <Styled.Container>   
      <Styled.TitleDiv>
        <Styled.LeftButtons>
          <Styled.Button onClick={() => navigate('/employeeregistration')}>Editar informações</Styled.Button>
          <Styled.Button onClick={() => navigate('/home')}>Excluir funcionário</Styled.Button>
        </Styled.LeftButtons>

        <Styled.RightButton>
          <Styled.Button onClick={() => navigate('/home')}>Voltar</Styled.Button>
        </Styled.RightButton>
      </Styled.TitleDiv>

      <Styled.Card>
        <Styled.Title>Detalhes do Funcionário</Styled.Title>
        <Styled.Field>
          <Styled.Label>Número de identificação:</Styled.Label>
          <Styled.Text>{funcionario.id}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Nome:</Styled.Label>
          <Styled.Text>{funcionario.nome}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>CPF:</Styled.Label>
          <Styled.Text>{funcionario.cpf}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Data de Nascimento:</Styled.Label>
          <Styled.Text>{formattedDate}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>E-mail:</Styled.Label>
          <Styled.Text>{funcionario.email}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Função:</Styled.Label>
          <Styled.Text>{funcionario.funcao}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Salário:</Styled.Label>
          <Styled.Text>R$ {funcionario.salario}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Observações:</Styled.Label>
          <Styled.Text>{funcionario.observacoes || 'Nenhuma observação'}</Styled.Text>
        </Styled.Field>
      </Styled.Card>
    </Styled.Container>
  );
}
