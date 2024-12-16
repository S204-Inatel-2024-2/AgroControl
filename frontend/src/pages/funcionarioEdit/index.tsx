import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { FuncionarioEdit as FuncionarioEditComponent } from '../../components/FuncionarioEdit';


export function ServiceEdit(): JSX.Element {

    return (
        <>
            <Styled.Container>
                <Header />
                <FuncionarioEditComponent />
            </Styled.Container>
        </>
    );
};

