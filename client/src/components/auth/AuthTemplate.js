import React from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 100%;
    background-color: #dcdcdc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    width: 50%;
    border-radius: 10px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 7rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
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