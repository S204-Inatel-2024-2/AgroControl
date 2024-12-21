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
import { getFuncionarioById, updateFuncionario } from "../../service/funcionario/funcionarioService";
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
                    const response = await getFuncionarioById(Number(id));
                    const funcionarioData = response.data.funcionario;
                    const formattedDate = funcionarioData.dataNascimento
                        ? formatarDataParaISO(funcionarioData.dataNascimento)
                        : "";

                    setFuncionario({
                        nome: funcionarioData.nome || "",
                        cpf: funcionarioData.cpf || "",
                        dataNascimento: formattedDate,
                        email: funcionarioData.email || "",
                        funcao: funcionarioData.funcao || "",
                        salario: funcionarioData.salario || "",
                        observacoes: funcionarioData.observacoes || "",
                    });
                } catch (error) {
                    console.error("Erro ao carregar os dados do funcionário:", error);
                    toast.error("Erro ao carregar os dados do funcionário.");
                }
            }
        }

        fetchData();
    }, [id]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFuncionario((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (id) {
                await updateFuncionario(Number(id), funcionario);
                toast.success("Funcionário atualizado com sucesso!");
            }
            navigate("/employees");
        } catch (error) {
            console.error("Erro ao salvar os dados do funcionário:", error);
            toast.error("Erro ao salvar o funcionário.");
        }
    };

    const formatarDataParaISO = (data: string): string => {
        if (!data) return "";
        const partes = data.split("/");
        if (partes.length === 3) {
            const [dia, mes, ano] = partes; // Desestruturação das partes
            return `${ano}-${mes}-${dia}`; // Formato ISO 8601 (yyyy-MM-dd)
        }
        return "";
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
