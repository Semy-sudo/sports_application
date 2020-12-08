import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3 { 
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    },
    h2 {
        color: #27AE60;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus: {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWidthMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const LoginFormBlock = () => {
    return(
        <AuthFormBlock>
            <h2>
                체육 시간, <br/>
                준비됐나요?
            </h2>
            <h3>로그인</h3>
            <form>
                <StyledInput autoComplete="id"
                             name="id"
                             placeholder="ID"
                />
                <StyledInput autoComplete="new-password"
                             name="passwd"
                             placeholder="Password"
                             type="password"
                />
                <ButtonWidthMarginTop 
                    cyan
                    fullWidth        
                >
                    로그인
                </ButtonWidthMarginTop>
            </form>
            <Footer>
                <Link to="/auth/register">Sign Up</Link>
            </Footer>
        </AuthFormBlock>
    )
}
export default LoginFormBlock;