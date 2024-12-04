import { axisClasses } from "@mui/x-charts";
import { Container } from "./styles";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { analiseFinanceira } from "../../service/dashboard/dashboard";

const chartSetting = {
  width: 750,
  height: 250,
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
  totalLucro: number;
  totalGasto: number;
}
export function BarVerticalChart(): JSX.Element {
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    analiseFinanceira()
      .then((resp) => {
        const formattedData = resp.data.map((item: Dados) => ({
          mes: monthNames[item.month - 1],
          lucro: item.totalLucro,
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
              max: 150000,
              tickMinStep: 25000,
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
