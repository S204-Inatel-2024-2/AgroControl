import { Container } from "./styles";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { listAllSalarios } from "../../service/dashboard/dashboard";

const chartSetting = {
  xAxis: [
    {
      tickMinStep: 400,
      label: "Salários (R$)",
    },
  ],
  width: 650,
  height: 500,
};

interface Dados {
  id?: string;
  nome: string;
  salario?: number;
  totalServicos?: number;
  totalSalario: number;
}

export function BarHorizontalChart(): JSX.Element {
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    listAllSalarios()
      .then((resp) => {
        const formattedData = resp.data.map((item: Dados) => ({
          nome: item.nome,
          salario: item.totalSalario,
        }));
        setDataset(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Container>
        <BarChart
          margin={{ left: 100, right: 100 }}
          dataset={dataset}
          yAxis={[
            {
              scaleType: "band",
              dataKey: "nome",
              colorMap: {
                type: "ordinal",
                values: dataset.map((item: Dados) => item.nome),
                colors: ["green"],
                unknownColor: "blue",
              },
            },
          ]}
          series={[
            {
              dataKey: "salario",
            },
          ]}
          layout="horizontal"
          grid={{ vertical: true }}
          {...chartSetting}
        />
      </Container>
    </>
  );
}
