import { axisClasses } from "@mui/x-charts";
import { Container } from "./styles";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { analiseFinanceira } from "../../service/dashboard/dashboard";
import { Typography } from "@mui/material";

const chartSetting = {
  width: 750,
  height: 400,
};

const monthNames = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];
interface Dados {
  month: number;
  totalLucroReceita: number;
  totalGasto: number;
}
export function BarVerticalChart(): JSX.Element {
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    analiseFinanceira()
      .then((resp) => {
        const formattedData = resp.data.map((item: Dados) => ({
          mes: monthNames[item.month - 1],
          lucro: item.totalLucroReceita,
          gasto: item.totalGasto,
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
        <Typography variant="h6" align="left" paddingLeft={5} color="black">
          Análise financeira mensal
        </Typography>
        <BarChart
          margin={{ left: 100, right: 150 }}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "mes",
            },
          ]}
          yAxis={[
            {
              scaleType: "linear",
              min: 0,
              max: 250000,
              tickMinStep: 10000,
            },
          ]}
          series={[
            {
              dataKey: "lucro",
              label: "Lucro",
              color: "green",
            },
            {
              dataKey: "gasto",
              label: "Gasto",
              color: "red",
            },
          ]}
          layout="vertical"
          grid={{ horizontal: true }}
          {...chartSetting}
        />
      </Container>
    </>
  );
}
