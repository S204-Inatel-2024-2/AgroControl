import { useEffect, useState } from "react";
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
} from "./styled";
import { Header } from "../../components/Header";
import {
  createServico,
  listAllFuncionarios,
  listAllTiposServico,
} from "../../service";
import { serviceSchema } from "../../validations/ServiceValidation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function RegisterFinances(): JSX.Element {
  const [responsavelServico, setResponsavelServico] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [listaTiposServico, setListaTiposServico] = useState([]);
  const [valorGasto, setValorGasto] = useState("R$0.00");
  const [valor, setValor] = useState(0.0);
  const [status, setStatus] = useState("");

  const createService = async (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = {
      dataAtividade: form.elements.date.value,
      tipoServico: form.elements.serviceType.value,
      responsavel: form.elements.serviceResponsible.value,
      valorGasto: !valor ? String(valor) : valor,
      status: form.elements.serviceStatus.value,
      observations: form.elements.observations.value,
    };
    const isValid = await serviceSchema.isValid(formData);

    if (!isValid) {
      const response = await createServico(formData);
      if (response.status === 201)
        toast.success("Operação realizada com sucesso!");
      else toast.error("Erro ao realizar a operação!");
    } else {
      toast.error("Os dados fornecidos estão incorretos.");
      console.log("imprimindo ");
      console.log(formData);
    }
  };

  function maskCurrency(value: string) {
    value = value.replace(/[^\d,-]/g, "");
    value = (parseFloat(value) / 100).toFixed(2).replace(",", ".");
    setValor(parseFloat(value));
    value = `R$${value}`;

    return value;
  }

  async function getAllFuncionarios() {
    const response = await listAllFuncionarios();
    if (response) setListaFuncionarios(response.data);
  }

  async function getAllTiposServico() {
    const response = await listAllTiposServico();
    if (response) setListaTiposServico(response.data);
  }

  useEffect(() => {
    getAllTiposServico();
    getAllFuncionarios();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header />
        <Body>
          <SubTitle>
            <h2>Cadastro de Serviço</h2>
            <div>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Voltar
              </Button>
              <Button type="submit" form="meuForm">
                Salvar informações
              </Button>
            </div>
          </SubTitle>
          <Form onSubmit={createService} id="meuForm">
            <LabelData>
              Data da atividade:
              <InputData
                required
                type="date"
                name="date"
                onKeyDown={(e) => e.preventDefault()}
              />
            </LabelData>

            <LabelServico>
              Tipo de Serviço:
              <Select
                required
                name="serviceType"
                value={tipoServico}
                onChange={(e) => setTipoServico(e.target.value)}
              >
                <Option value="" disabled hidden></Option>
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
                required
                name="serviceResponsible"
                value={responsavelServico}
                onChange={(e) => setResponsavelServico(e.target.value)}
              >
                <Option value="" disabled hidden></Option>
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
                value={valorGasto}
                type="text"
                required
                name="serviceValue"
                onChange={(e) => setValorGasto(maskCurrency(e.target.value))}
              />
            </LabelValor>

            <LabelStatus>
              Status do serviço:
              <Select
                required
                name="serviceStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Option value="" disabled hidden></Option>
                <Option value="pendente">PENDENTE</Option>
                <Option value="emAndamento">EM ANDAMENTO</Option>
                <Option value="concluido">CONCLUÍDO</Option>
              </Select>
            </LabelStatus>

            <LabelObs>
              Observações:
              <InputObs required name="observations" rows={6} />
            </LabelObs>
          </Form>
        </Body>
      </Container>
    </>
  );
}
