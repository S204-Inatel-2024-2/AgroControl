import React, { useEffect, useState } from "react";
import {
  Body,
  Button,
  Container,
  Form,
  Input,
  InputData,
  InputObs,
  LabelData,
  LabelObs,
  LabelResponsavel,
  LabelServico,
  LabelStatus,
  LabelValor,
  Option,
  Select,
  SubTitle,
} from "./styles";
import { Header } from "../../components/Header";
import {
  createServico,
  updateServico,
  listAllFuncionarios,
  listAllTiposServico,
  getServicoById,
} from "../../service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function ServiceEdit(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [servico, setServico] = useState({
    dataAtividade: "",
    tipoServico: "",
    responsavel: "",
    valorGasto: "",
    status: "",
    observacoes: "",
  });
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [listaTiposServico, setListaTiposServico] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await getServicoById(Number(id));
          const data = response.data;

          // Converte a data para o formato esperado pelo input type="date"
          const formattedDate = data.dataAtividade
            ? new Date(data.dataAtividade).toISOString().split("T")[0]
            : "";

          setServico({
            dataAtividade: formattedDate,
            tipoServico: data.tipoServico || "",
            responsavel: data.responsavel || "",
            valorGasto: data.valorGasto ? data.valorGasto.toString() : "",
            status: data.status || "",
            observacoes: data.observacoes || "",
          });
        } catch (error) {
          console.error("Erro ao carregar os dados do serviço:", error);
          toast.error("Erro ao carregar os dados do serviço.");
        }
      }

      try {
        const funcionarios = await listAllFuncionarios();
        const tiposServico = await listAllTiposServico();

        setListaFuncionarios(funcionarios.data || []);
        setListaTiposServico(tiposServico.data || []);
      } catch (error) {
        console.error("Erro ao carregar listas de funcionários ou tipos de serviço:", error);
        toast.error("Erro ao carregar listas de apoio.");
      }
    }

    fetchData();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServico((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (id) {
        await updateServico(Number(id), servico);
        toast.success("Serviço atualizado com sucesso!");
      } else {
        await createServico(servico);
        toast.success("Serviço criado com sucesso!");
      }
      navigate("/services");
    } catch (error) {
      toast.error("Erro ao salvar o serviço.");
    }
  };

  return (
    <Container>
      <Header />
      <Body>
        <SubTitle>
          <h2>{id ? "Editar Serviço" : "Cadastrar Serviço"}</h2>
          <div>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
            <Button type="submit" form="formService">
              Salvar
            </Button>
          </div>
        </SubTitle>
        <Form id="formService" onSubmit={handleSubmit}>
          <LabelData>
            Data da atividade:
            <InputData
              type="date"
              name="dataAtividade"
              value={servico.dataAtividade}
              onChange={handleChange}
              required
            />
          </LabelData>

          <LabelServico>
            Tipo de Serviço:
            <Select
              name="tipoServico"
              value={servico.tipoServico}
              onChange={handleChange}
              required
            >
              <Option value="" disabled hidden>Selecione</Option>
              {listaTiposServico.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.descricao}
                </Option>
              ))}
            </Select>
          </LabelServico>

          <LabelResponsavel>
            Responsável pelo Serviço:
            <Select
              name="responsavel"
              value={servico.responsavel}
              onChange={handleChange}
              required
            >
              <Option value="" disabled hidden>Selecione</Option>
              {listaFuncionarios.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.nome}
                </Option>
              ))}
            </Select>
          </LabelResponsavel>

          <LabelValor>
            Valor do Serviço:
            <Input
              type="text"
              name="valorGasto"
              value={servico.valorGasto}
              onChange={handleChange}
              required
            />
          </LabelValor>

          <LabelStatus>
            Status do serviço:
            <Select
              name="status"
              value={servico.status}
              onChange={handleChange}
              required
            >
              <Option value="" disabled hidden>Selecione</Option>
              <Option value="pendente">PENDENTE</Option>
              <Option value="emAndamento">EM ANDAMENTO</Option>
              <Option value="concluido">CONCLUÍDO</Option>
            </Select>
          </LabelStatus>

          <LabelObs>
            Observações:
            <InputObs
              name="observacoes"
              value={servico.observacoes}
              onChange={handleChange}
              rows={6}
            />
          </LabelObs>
        </Form>
      </Body>
    </Container>
  );
}
