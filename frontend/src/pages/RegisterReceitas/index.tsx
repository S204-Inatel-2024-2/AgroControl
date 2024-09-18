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


export function RegisterReceitas(): JSX.Element {
    const [islucroReceita, setLucroReceita] = useState("");//
    const [valorReceita, setValorReceita] = useState("R$0.00");
    const [categorias, setCategorias] = useState("");
    const [listaCategoriasReceita, setCategoriasReceita] = useState([]);

    const creatReceita = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = {
            isLucro: form.elements.IsLucro.value,
            valorReceita: form.elements.receitaValue.value,
            obsReceita: form.elements.observationsReceita.value,
            categoriaReceita: form.elements.categoriaReceita.value,
        }

        const isValid = await receitaSchema.isValid(formData);

        if (isValid) {
            const response = await createReceita(formData);
            if (response.status === 201)
                toast.success("Operação realizada com sucesso!");
            else toast.error("Erro ao realizar a operação!");
        } else {
            toast.error("Os dados fornecidos estão incorretos.");
            console.log("imprimindo ")
            console.log(formData)
        }

    };

    async function getAllCategorias() {
        const response = await listAllCategoriasReceita();
        if (response) setCategoriasReceita(response.data);
    }

    useEffect(() => {
        getAllCategorias();
    }, []);


    return (
        <>
            <Container>
                <Header />
                <Body>
                    <SubTitle>
                        <h2>Nova receita</h2>
                        <div>
                            <Button>Voltar</Button>
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
                                name="categoriaReceita"
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
                                name="receitaValue"
                                onChange={(e) => setValorReceita(e.target.value)}
                            />
                        </LabelValor>


                        <LabelObs>
                            Observações:
                            <InputObs required name="observations" rows={6} />
                        </LabelObs>

                        <LabelIsLucro>
                            A receita gerou lucro:
                            <Select
                                required
                                name="IsLucro"
                                value={islucroReceita}
                                onChange={(e) => setLucroReceita(e.target.value)}
                            >
                                <Option value="" disabled hidden></Option>
                                <Option value="pendente">Sim</Option>
                                <Option value="emAndamento">Não</Option>
                            </Select>
                        </LabelIsLucro>

                    </Form>
                </Body>

            </Container>



        </>
    )

}