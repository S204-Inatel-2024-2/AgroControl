import React from 'react';
import * as Styled from './styles';
import { Header } from '../../components/Header';
import { ServicesList } from '../../components/ServicesList';

export function Services(): JSX.Element{
    return(
        <>
        <Styled.Container>
            <Header/>
            <ServicesList/>
        </Styled.Container>
        </>
    )
}