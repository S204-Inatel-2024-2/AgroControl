import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
	top: 0px;
	left: 0px;
	height: 100px;
	width: 100%;
    background-color: #f5c400;
    z-index: 1;
`;

export const Title = styled.text`
    font-size: 30px;
    font-weight: bolder;
    color: #333333;
    position: absolute;
    left: 10%;
    
`

export const UserText = styled.text`
    font-weight: bolder;
    color: #333333;
    position: absolute;
    right: 10%;
`