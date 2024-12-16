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
    LabelValor,
    SubTitle,
} from "./styles";
import { Header } from "../../components/Header";
import { getFuncionarioById, updateFuncionario, listAllFuncionarios } from "../../service/funcionario/funcionarioService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function FuncionarioEdit(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [funcionario, setFuncionario] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        funcao: "",
        salario: "",
        observacoes: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (id) {
                try {
                    console.log("Buscando dados do funcionário para edição, ID:", id);
                    const response = await getFuncionarioById(Number(id));
                    console.log("Dados do funcionário recebidos:", response.data);

                    const dataNascimentoFormatada = response.data.dataNascimento
                        ? new Date(response.data.dataNascimento).toISOString().split("T")[0]
                        : "";

                    setFuncionario({
                        nome: response.data.nome || "",
                        cpf: response.data.cpf,
                        dataNascimento: dataNascimentoFormatada,
                        email: response.data.email,
                        funcao: response.data.funcao,
                        salario: response.data.salario,
                        observacoes: response.data.observacoes,
                    });
                } catch (error) {
                    console.error("Erro ao carregar os dados do funcionário:", error);
                    toast.error("Erro ao carregar os dados do funcionário.");
                }
                try {
                    const funcionarios = await listAllFuncionarios();
                    console.log("Lista de funcionários carregada:", funcionarios.data);
                    //setListaFuncionarios(funcionarios.data || []);
                } catch (error) {
                    console.error("Erro ao carregar listas de apoio:", error);
                    toast.error("Erro ao carregar listas de apoio.");
                }
            }
        }

        fetchData();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(`Alterando o campo: ${name}, Novo valor: ${value}`);
        setFuncionario((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Enviando os dados do formulário:", funcionario);

        try {
            if (id) {
                await updateFuncionario(Number(id), funcionario);
                toast.success("Funcionário atualizado com sucesso!");
                console.log("Atualização concluída com sucesso.");
            }
            navigate("/employees");
        } catch (error) {
            console.error("Erro ao salvar os dados do funcionário:", error);
            toast.error("Erro ao salvar o funcionário.");
        }
    };


    return (
        <Container>
            <Header />
            <Body>
                <SubTitle>
                    <h2>{id ? "Editar Funcionário" : "Cadastrar Funcionário"}</h2>
                    <div>
                        <Button onClick={() => navigate(-1)}>Voltar</Button>
                        <Button type="submit" form="formFuncionario">
                            Salvar
                        </Button>
                    </div>
                </SubTitle>
                <Form id="formFuncionario" onSubmit={handleSubmit}>
                    <LabelResponsavel>
                        Nome:
                        <Input
                            name="nome"
                            value={funcionario.nome}
                            onChange={handleChange}
                            required
                        />
                    </LabelResponsavel>

                    <LabelData>
                        Data de Nascimento:
                        <InputData
                            type="date"
                            name="dataNascimento"
                            value={funcionario.dataNascimento}
                            onChange={handleChange}
                            required
                        />
                    </LabelData>

                    <LabelValor>
                        Salário:
                        <Input
                            type="text"
                            name="salario"
                            value={funcionario.salario}
                            onChange={handleChange}
                            required
                        />
                    </LabelValor>

                    <LabelValor>
                        CPF:
                        <Input
                            type="text"
                            name="cpf"
                            value={funcionario.cpf}
                            onChange={handleChange}
                            required
                        />
                    </LabelValor>

                    <LabelValor>
                        Email:
                        <Input
                            type="text"
                            name="email"
                            value={funcionario.email}
                            onChange={handleChange}
                            required
                        />
                    </LabelValor>

                    <LabelResponsavel>
                        Função:
                        <Input
                            name="funcao"
                            value={funcionario.funcao}
                            onChange={handleChange}
                            required
                        />
                    </LabelResponsavel>

                    <LabelObs>
                        Observações:
                        <InputObs
                            name="observacoes"
                            value={funcionario.observacoes}
                            onChange={handleChange}
                            rows={6}
                        />
                    </LabelObs>
                </Form>
            </Body>
        </Container>
    );
}
