import React from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
    float: left;
    margin-top: 100px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    width: 50%;
    margin-top: 50px;
    margin-bottom: 50px;
    padding-left: 7rem;
    padding-right: 7rem;
    padding-bottom: 7rem;
    background-color: #ffffff;
`;

const AuthTemplate = ({ children }) => {
    return(
        <AuthTemplateBlock>
            <WhiteBox>
                { children }
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;