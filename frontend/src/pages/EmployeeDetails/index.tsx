import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { EmployeeDetails as EmployeeDetailsComponent } from '../../components/FunciorioDetails';


export function EmployeeDetails(): JSX.Element {

  return (
    <>
      <Styled.Container>
        <Header />
        <EmployeeDetailsComponent />
      </Styled.Container>
    </>
  );
};

