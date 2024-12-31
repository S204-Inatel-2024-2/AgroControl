import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import { analiseFinanceira, lucroByReceita } from "../../service/dashboard/dashboard";
import { Container } from "./styles";

interface DadosMensais {
  mes: string;
  lucro: number;
  gasto: number;
}

interface ReceitaCategoria {
  totalValorReceita: number;
  "categoria.descricao": string;
}

const chartSetting = {
  width: 750,
  height: 400,
};

export function BarVerticalChart(): JSX.Element {
  const [dadosMensais, setDadosMensais] = useState<DadosMensais[]>([]);
  const [lucroPorReceita, setLucroPorReceita] = useState<ReceitaCategoria[]>([]);

  useEffect(() => {
    analiseFinanceira()
      .then((resp) => {
        const formattedData = resp.data.map((item: any) => ({
          mes: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][item.month - 1],
          lucro: item.totalLucroReceita,
          gasto: item.totalGasto,
        }));
        setDadosMensais(formattedData);
      })
      .catch((error) => console.error(error));

    lucroByReceita()
      .then((resp) => {
        setLucroPorReceita(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const dadosMensaisDataset = dadosMensais.map((item) => ({
    mes: item.mes,
    lucro: item.lucro,
    gasto: item.gasto,
  }));

  const lucroPorReceitaDataset = lucroPorReceita.map((item) => ({
    receita: item["categoria.descricao"],
    valor: item.totalValorReceita,
  }));

  return (
    <>
      <Container>
        <Typography variant="h6" align="left" paddingLeft={5} color="black">
          Análise Financeira Mensal
        </Typography>
        <BarChart
          margin={{ left: 100, right: 150 }}
          dataset={dadosMensaisDataset}
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
              max: Math.max(...dadosMensais.map((d) => d.lucro), 0) * 1.2,
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

      <Container>
        <Typography variant="h6" align="left" paddingLeft={5} color="black">
          Lucro Por Receita
        </Typography>
        <BarChart
          margin={{ left: 100, right: 150 }}
          dataset={lucroPorReceitaDataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "receita",
            },
          ]}
          yAxis={[
            {
              scaleType: "linear",
              min: 0,
              max: Math.max(...lucroPorReceita.map((d) => d.totalValorReceita), 0) * 1.2,
              tickMinStep: 10000,
            },
          ]}
          series={[
            {
              dataKey: "valor",
              label: "Valor",
              color: "blue",
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
