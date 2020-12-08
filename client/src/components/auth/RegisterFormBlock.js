import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import RegisterCertification from './RegisterCertification';
import axios from 'axios';

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

const StyleButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline; none;
    cursor: pointer;
    margin-top: 1rem;
    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]}
    }

    ${props => 
      props.fullWidth &&
      css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
      `
    }

    ${props => 
      props.halfWidth &&
      css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 70%;
        font-size: 1.125rem;
      `
    }

    ${props => 
        props.cyan &&
        css`
          background: #27AE60;
          &:hover {
            background: #5EC88B;
          }
        `
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
    const [error, setError] = useState('');
    const [certifiState, setCertifiState] = useState(false);
    const [user, setUser] = useState(
        {
            type: '',
            id: '',
            passwd: '',
            passwdConfirm: '',
            email: '',
            certifiGrade: '',
            certifiName: '',
            certifiDate: '',
        }
    );
    const changeField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    const onCertifiButtonClick = e => {
        setCertifiState(true);
    };
    const onCancel = e => {
        setUser({ 
            ...user,
            ['certifiDate']: '' 
        });

        setUser({ 
            ...user,
            ['certifiName']: '' 
        });

        setUser({ 
            ...user,
            ['certifiGrade']: '' 
        });

        setCertifiState(false);
    };
    const onRegister = e => {
        e.preventDefault();

        if([user.certifiDate, 
            user.certifiGrade, 
            user.certifiName].includes('')
        ) {
            setError('빈 칸을 모두 입력하세요');

            return;
        }

        setCertifiState(false);
    };
    const onClick = e => {
        if([user.id, user.passwd, user.passwdConfirm, user.email].includes('')) {
            setError('빈 칸을 모두 입력하세요');

            return;
        }

        if(user.passwd !== user.passwdConfirm) {
            setError('비밀번호가 일치하지 않습니다!');

            return;
        }

        if(
            [user.certifiDate, 
            user.certifiGrade, 
            user.certifiName].includes('')
        ) {
            setUser({ 
                ...user,
                type: 'parent'
            });  
        } else if(
            !([user.certifiDate, 
            user.certifiGrade, 
            user.certifiName].includes(''))
        ) {
            setUser({ 
                ...user,
                type: 'expert' 
            });
        }

        if(user.type === '') {
            console.log(user.certifiDate);
            console.log(user.certifiGrade);
            console.log(user.certifiName);
            console.log(user.type);

            return;
        } else {
            console.log(user.type);
        }

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post('/api/auth/register', {
                type: user.type,
                id: user.id,
                passwd: user.passwd,
                email: user.email,
                certifiName: user.certifiName,
                certifiGrade: user.certifiGrade,
                certifiDate: user.certifiDate,
            },
            config
        ).then( (response) => {
            setUser({
                type: '',
                id: '',
                passwd: '',
                passwdConfirm: '',
                email: '',
                certifiGrade: '',
                certifiName: '',
                certifiDate: '',
            })
        });
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
                    onChange={ changeField }
                    error={ error }
                />
            }
            <StyledInput 
                autoComplete="id"
                name="id"
                placeholder="ID"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="new-password"
                name="passwd"
                placeholder="Password"
                type="password"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="new-password"
                name="passwdConfirm"
                placeholder="Re-Password"
                type="password"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="email"
                name="email"
                placeholder="Email"
                type="text"
                onChange={ changeField }
            />
            { error && <ErrorMessage>{ error }</ErrorMessage> }
            <StyleButton 
                cyan
                fullWidth  
                type="button"  
                onClick={ onClick }    
            >
                회원가입
            </StyleButton>
            <Footer>
                <Link to="/auth/login">Login</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default RegisterFormBlock;