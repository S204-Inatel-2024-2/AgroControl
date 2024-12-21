import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServicoById, deleteServico, getTipoServicoById, } from "../../service/servicos/servicos";
import { getFuncionarioById } from "../../service/funcionario/funcionarioService";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";

interface Servico {
  IdServico: number;
  status: string;
  dataAtividade: string;
  tipoServico: number;
  responsavel: number;
  valorGasto: number;
  observacoes?: string;
}

interface Funcionario {
  id: number;
  nome: string;
}

interface TipoServico {
  id: number;
  descricao: string;
}

export function ServiceDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [servico, setServico] = useState<Servico | null>(null);
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [tipoServico, setTipoServico] = useState<TipoServico | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("ID do serviço não foi fornecido.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getServicoById(Number(id));
        setServico(response.data);

        const funcionarioResponse = await getFuncionarioById(
          response.data.responsavel
        );
        setFuncionario(funcionarioResponse.data.funcionario);

        const tipoServicoResponse = await getTipoServicoById(
          response.data.tipoServico
        );
        setTipoServico(tipoServicoResponse.data);
      } catch (error) {
        setError("Erro ao carregar os detalhes do serviço.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir o serviço?"
    );
    if (confirmDelete && id) {
      try {
        await deleteServico(Number(id));
        alert("Serviço excluído com sucesso!");
        navigate("/services");
      } catch (error) {
        alert("Erro ao excluir o serviço.");
      }
    }
  };

  const handleFuncionarioClick = () => {
    if (funcionario) {
      navigate(`/employeedetails/${funcionario.id}`);
    }
  };

  if (loading) {
    return <Styled.Loading>Carregando...</Styled.Loading>;
  }

  if (error) {
    return <Styled.Error>{error}</Styled.Error>;
  }

  if (!servico) {
    return <Styled.Error>Serviço não encontrado.</Styled.Error>;
  }

  const formattedDate = servico.dataAtividade
    ? new Date(servico.dataAtividade).toLocaleDateString()
    : "Data inválida";

  return (
    <Styled.Container>
      <Styled.TitleDiv>
        <Styled.LeftButtons>
          <Styled.Button onClick={() => navigate(`/serviceEdit/${servico.IdServico}`)}>
            Editar informações
          </Styled.Button>
          <Styled.Button onClick={handleDelete}>Excluir serviço</Styled.Button>
        </Styled.LeftButtons>

        <Styled.RightButton>
          <Styled.Button onClick={() => navigate("/services")}>
            Voltar
          </Styled.Button>
        </Styled.RightButton>
      </Styled.TitleDiv>

      <Styled.Card>
        <Styled.Title>Detalhes do Serviço</Styled.Title>
        <Styled.Field>
          <Styled.Label>Número de identificação:</Styled.Label>
          <Styled.Text>{servico.IdServico}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Status:</Styled.Label>
          <Styled.Text>{servico.status}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Data da atividade:</Styled.Label>
          <Styled.Text>{formattedDate}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Tipo de serviço:</Styled.Label>
          <Styled.Text>{tipoServico?.descricao}</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Responsável:</Styled.Label>
          <Styled.ClickableText onClick={handleFuncionarioClick}>
            {funcionario?.nome}
          </Styled.ClickableText>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Valor gasto:</Styled.Label>
          <Styled.Text>R${servico.valorGasto},00</Styled.Text>
        </Styled.Field>

        <Styled.Field>
          <Styled.Label>Observações:</Styled.Label>
          <Styled.Text>
            {servico.observacoes || "Nenhuma observação"}
          </Styled.Text>
        </Styled.Field>
      </Styled.Card>
    </Styled.Container>
  );
}
