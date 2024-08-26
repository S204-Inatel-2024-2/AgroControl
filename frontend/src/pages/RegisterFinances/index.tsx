import { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Body,
  Button,
  Container,
  Exit,
  Form,
  Greeting,
  Input,
  InputData,
  InputObs,
  LabelData,
  LabelObs,
  LabelResponsavel,
  LabelServico,
  LabelStatus,
  LabelValor,
  Menu,
  Option,
  Select,
  SubTitle,
  Title,
} from "./styled";
import { Header } from "../../components/Header";
import { listAllFuncionarios } from "../../service";

export function RegisterFinances(): JSX.Element {
  const [dataAtividade, setDataAtividade] = useState("");
  const [servico, setServico] = useState("");
  const [responsavelServico, setResponsavelServico] = useState("");
  const [listaFuncionarios, setListaFuncionarios] = useState([]);
  const [valorGasto, setValorGasto] = useState("R$0.00");
  const [status, setStatus] = useState("");

  const handleRegister = () => {
    //adicionar funcionalidade
  };

  function maskCurrency(value: string) {
    value = value.replace(/\D/g, "");
    value = (parseFloat(value) / 100).toFixed(2).replace(",", ".");

    value = `R$${value}`;

    return value;
  }

  async function getAllFuncionarios() {
    const response = await listAllFuncionarios();
    if (response) setListaFuncionarios(response.data);
  }

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Body>
          <SubTitle>
            <h2>Relatório Financeiro</h2>
            <div>
              <Button>Voltar</Button>
              <Button onClick={handleRegister}>Salvar informações</Button>
            </div>
          </SubTitle>
          <Form>
            <LabelData>
              Data da atividade:
              <InputData
                required
                type="date"
                onChange={(e) => setDataAtividade(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </LabelData>

            <LabelServico>
              Tipo de Serviço:
              <Input
                required
                type="text"
                onChange={(e) => setServico(e.target.value)}
              />
            </LabelServico>

            <LabelResponsavel>
              Responsável pelo Serviço:
              <Select
                value={responsavelServico}
                onChange={(e) => setResponsavelServico(e.target.value)}
              >
                <Option value="" disabled hidden></Option>
                {listaFuncionarios.map((item: any) => (
                  <Option value={item.nome}>{item.nome}</Option>
                ))}
              </Select>
            </LabelResponsavel>

            <LabelValor>
              Valor do Serviço:
              <Input
                value={valorGasto}
                type="text"
                required
                onChange={(e) => setValorGasto(maskCurrency(e.target.value))}
              />
            </LabelValor>

            <LabelStatus>
              Status do serviço:
              <Select
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
              <InputObs rows={6} />
            </LabelObs>
          </Form>
        </Body>
      </Container>
    </>
  );
}
