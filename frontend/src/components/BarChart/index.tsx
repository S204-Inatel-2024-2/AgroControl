import { axisClasses } from "@mui/x-charts";
import { Container } from "./styles";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";

const chartSetting = {
  xAxis: [
    {
      tickMinStep: 400,
    },
  ],
  width: 700,
  height: 250,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const dataset = [
  {
    nome: "Funcionario 1",
    salario: 1000.0,
    bonificacao: 100,
  },
  {
    nome: "Funcionario 2",
    salario: 1200.0,
    bonificacao: 150,
  },
  {
    nome: "Funcionario 3",
    salario: 1600.0,
    bonificacao: 60,
  },
  {
    nome: "Funcionario 4",
    salario: 2000.0,
    bonificacao: 85,
  },
  {
    nome: "Funcionario 5",
    salario: 2500.0,
    bonificacao: 100,
  },
  {
    nome: "Funcionario 6",
    salario: 1900.0,
    bonificacao: 100,
  },
  {
    nome: "Funcionario 7",
    salario: 1600.0,
    bonificacao: 123.4,
  },
];

// export function valueFormatter(value: number | null) {
//   return `${value}`;
// }

export function BarVerticalChart(): JSX.Element {
  return (
    <>
      <Container>
        <BarChart
          margin={{ left: 100, right: 100 }}
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "nome" }]}
          series={[
            {
              dataKey: "salario",
            },
            {
              dataKey: "bonificacao",
            },
          ]}
          grid={{ horizontal: true }}
          {...chartSetting}
        />
      </Container>
    </>
  );
}
