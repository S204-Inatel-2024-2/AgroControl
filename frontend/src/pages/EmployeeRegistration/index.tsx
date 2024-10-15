import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { EmployeeForms } from '../../components/EmployeeForms';





export function EmployeeRegistration(): JSX.Element {
  
  return (
    <>
      <Header/>
        <Styled.Container>
            
            <EmployeeForms/>
        
        
        </Styled.Container>
    </>

  );
};