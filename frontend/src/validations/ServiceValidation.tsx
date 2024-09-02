import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  date: yup.date().required("Data da atividade é obrigatória."),
  serviceType: yup.string().required("Tipo de serviço é obrigatório."),
  serviceResponsible: yup
    .string()
    .required("Responsável pelo serviço é obrigatório."),
  serviceValue: yup.string().required("Valor do serviço é obrigatório"),
  serviceStatus: yup.string().required("Status do serviço é obrigatório."),
  observations: yup.string().required("Observações são obrigatórias."),
});
