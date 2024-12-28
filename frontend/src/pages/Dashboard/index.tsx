import React from "react";
import * as Styled from "./styled";
import { Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { BarVerticalChart } from "../../components/BarChart";
import { BarHorizontalChart } from "../../components/BarHorizontalChart";

export function Dashboard(): JSX.Element {
  return (
    <>
      <Header />
      <Styled.Container>
        <Typography variant="h3" align="left" marginBottom={2} color="#de8400">
          Dashboard Financeiro
        </Typography>
        <Styled.ChartsContainer>
          <BarHorizontalChart />
          <Styled.RightContainer>
            <BarVerticalChart />
          </Styled.RightContainer>
        </Styled.ChartsContainer>
      </Styled.Container>
    </>
  );
}
