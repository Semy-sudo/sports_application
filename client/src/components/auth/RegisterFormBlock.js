import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import RegisterCertification from './RegisterCertification';

const AuthFormBlock = styled.div`
    h3 { 
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const AuthFormBlockHeader = styled.div`
    width: 100%;
`;

const Header_Header = styled.div`
    float: left;
    width: 50%;
`;

const Header_Footer = styled.div`
    float: left;
    width: 50%;
    text-align: right;
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

const Button_Certification = styled.button`
    background-color: #ffffff;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const RegisterFormBlock = () => {
    const [certifiState, setCertifiState] = useState(false);
    const onCertifiButtonClick = e => {
        setCertifiState(true);
    };
    const onCancel = e => {
        setCertifiState(false);
    };
    const onRegister = e => {
        e.preventDefault();

        console.log(document.getElementById('certifiGrade').value);
    };

    return(
        <AuthFormBlock>
            <AuthFormBlockHeader>
                <Header_Header>
                    <h3>회원가입</h3>
                </Header_Header>
                <Header_Footer>
                    <Button_Certification
                        onClick={ onCertifiButtonClick }
                    >
                        지도사로 가입하려면?
                    </Button_Certification>
                </Header_Footer>
            </AuthFormBlockHeader>
            {
                certifiState &&
                <RegisterCertification
                    onRegister={ onRegister }
                    onCancel={ onCancel }
                />
            }
            <form>
                <StyledInput 
                    autoComplete="id"
                    name="id"
                    placeholder="ID"
                />
                <StyledInput 
                    autoComplete="new-password"
                    name="passwd"
                    placeholder="Password"
                    type="password"
                />
                <StyledInput 
                    autoComplete="new-password"
                    name="passwdConfirm"
                    placeholder="Re-Password"
                    type="password"
                />
                <StyledInput 
                    autoComplete="email"
                    name="email"
                    placeholder="Email"
                    type="text"
                />
                {/* { error && <ErrorMessage>{ error }</ErrorMessage> } */}
                <ButtonWidthMarginTop 
                    cyan
                    fullWidth        
                >
                    회원가입
                </ButtonWidthMarginTop>
            </form>
            <Footer>
                <Link to="/auth/login">Login</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default RegisterFormBlock;