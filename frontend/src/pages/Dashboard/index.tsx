import React from "react";
import * as Styled from "./styled";
import { Header } from "../../components/Header";
import { BarVerticalChart } from "../../components/BarChart";
import { BarHorizontalChart } from "../../components/BarHorizontalChart";

export function Dashboard(): JSX.Element {
  return (
    <>
      <Header />
      <Styled.Container>
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
