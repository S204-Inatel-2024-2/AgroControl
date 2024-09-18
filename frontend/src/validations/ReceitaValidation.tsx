import * as yup from "yup";

export const receitaSchema = yup.object().shape({
  isLucro: yup.boolean(),
  valorReceita: yup.string().required("Valor do serviço é obrigatório"),
  receitaObs: yup.string().required("Observações são obrigatórias."),
  categoriaReceita: yup.string().required("categoria do serviço é obrigatória."),
});
