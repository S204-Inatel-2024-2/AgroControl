import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { FinancesList } from '../../components/FinancesList';

export function Finances(): JSX.Element{
    return(
        <>
        <Styled.Container>
            <Header/>
            <FinancesList/>
        </Styled.Container>
        </>
    )
}