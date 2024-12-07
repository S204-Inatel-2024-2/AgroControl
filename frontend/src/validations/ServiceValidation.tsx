import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  date: yup.date().required("Data da atividade é obrigatória."),
  serviceType: yup.string().required("Tipo de serviço é obrigatório."),
  serviceResponsible: yup
    .string()
    .required("Responsável pelo serviço é obrigatório."),
  serviceValue: yup.number().required("Valor do serviço é obrigatório"),
  serviceStatus: yup.string().required("Status do serviço é obrigatório."),
  observations: yup.string().required("Observações são obrigatórias."),
});

interface ServiceData {
  date: Date;
  serviceType: string;
  serviceResponsible: string;
  serviceValue: number;
  serviceStatus: string;
  observations: string;
}

export const validateService = async (data: ServiceData) => {
  try {
    await serviceSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return {
        isValid: false,
        errors: err.inner.map((error) => ({
          field: error.path,
          message: error.message,
        })),
      };
    }
    return { isValid: false, errors: [{ field: "unknown", message: "Unknown error" }] };
  }
};
