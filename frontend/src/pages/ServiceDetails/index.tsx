import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { ServiceDetails as ServiceDetailsComponent } from '../../components/ServiceDetails';


export function ServiceDetails(): JSX.Element {
  
  return (
    <>
        <Styled.Container>
            <Header/>
            <ServiceDetailsComponent />
        </Styled.Container>
    </>
  );
};

