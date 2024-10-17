import { useEffect, useState } from "react";
import {
    Body,
    Button,
    Container,
    Form,
    Input,
    InputObs,
    LabelObs,
    LabelReceita,
    LabelIsLucro,
    LabelValor,
    Option,
    Select,
    SubTitle,
} from "./styled";
import { Header } from "../../components/Header";
import { listAllCategoriasReceita, createReceita } from '../../service/receita/receitaService'
import { toast } from "react-toastify";
import { receitaSchema } from "../../validations/ReceitaValidation"
import { useNavigate } from "react-router-dom";


export function RegisterReceitas(): JSX.Element {
    const [islucroReceita, setLucroReceita] = useState("");//
    const [valorReceita, setValorReceita] = useState("");
    const [categorias, setCategorias] = useState("");
    const [listaCategoriasReceita, setCategoriasReceita] = useState([]);

    const creatReceita = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = {
            lucro: form.elements.lucro.value === 'Sim' ? true : "false",
            valorReceita: parseFloat(form.elements.valorReceita.value),
            observacao: form.elements.observacao.value,
            idCategoria: Number(form.elements.idCategoria.value),
        };

        const isValid = await receitaSchema.isValid(formData);

        if (!isValid) {
            const response = await createReceita(formData);
            if (response.status === 201)
                toast.success("Operação realizada com sucesso!");
            else toast.error("Erro ao realizar a operação dsada !");
        } else {
            toast.error("Os dados fornecidos estão incorretos.");
            console.log("imprimindo ");
            console.log(formData);
        }
    };

    async function getAllCategorias() {
        const response = await listAllCategoriasReceita();
        if (response) setCategoriasReceita(response.data);
    }

    useEffect(() => {
        getAllCategorias();
    }, []);

    const navigate = useNavigate()
    return (
        <>
            <Container>
                <Header />
                <Body>
                    <SubTitle>
                        <h2>Nova receita</h2>
                        <div>
                            <Button onClick={()=>{navigate(-1)}}>Voltar</Button>
                            <Button type="submit" form="meuForm">
                                Salvar informações
                            </Button>
                        </div>
                    </SubTitle>
                    <Form onSubmit={creatReceita} id="meuForm">
                        <LabelReceita>
                            Categoria da receita:
                            <Select
                                required
                                name="idCategoria"
                                value={categorias}
                                onChange={(e) => setCategorias(e.target.value)}
                            >
                                <Option value="" disabled hidden></Option>
                                {listaCategoriasReceita.map((item: any) => (
                                    <Option key={item.id} value={item.id}>{item.descricao}</Option>
                                ))}
                            </Select>

                        </LabelReceita>


                        <LabelValor>
                            Valor da Receita:
                            <Input
                                value={valorReceita}
                                type="text"
                                required
                                name="valorReceita"
                                onChange={(e) => setValorReceita(e.target.value)}
                            />
                        </LabelValor>


                        <LabelObs>
                            Observações:
                            <InputObs required name="observacao" rows={6} />
                        </LabelObs>

                        <LabelIsLucro>
                            A receita gerou lucro:
                            <Select
                                required
                                name="lucro"
                                value={islucroReceita}
                                onChange={(e) => setLucroReceita(e.target.value)}
                            >
                                <Option value="" disabled hidden></Option>
                                <Option value="Sim">Sim</Option>
                                <Option value="Não">Não</Option>
                            </Select>
                        </LabelIsLucro>

                    </Form>
                </Body>

            </Container>



        </>
    )

}