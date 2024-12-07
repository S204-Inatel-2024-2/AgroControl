import React from 'react';
import * as Styled from './styled';
import { Header } from '../../components/Header';
import { ServiceEdit as ServiceEditComponent } from '../../components/ServiceEdit';


export function ServiceEdit(): JSX.Element {

    return (
        <>
            <Styled.Container>
                <Header />
                <ServiceEditComponent />
            </Styled.Container>
        </>
    );
};

