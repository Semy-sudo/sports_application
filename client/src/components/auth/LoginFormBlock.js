import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link, withRouter } from 'react-router-dom';
import Button from '../common/Button';
var axios = require('axios');

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

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const LoginFormBlock = ({ history }) => {
    const [user, setUser] = useState('');
    const [tempUser, setTempUser] = useState(
        {
            id: '',
            passwd: ''
        }
    );
    const changeField = e => {
        setTempUser({
            ...tempUser,
            [e.target.name]: e.target.value
        })
    };
    const onClick = e => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post('/api/auth/login', {
                id: tempUser.id,
                passwd: tempUser.passwd
            },
            config
        ).then( (response) => {
            setTempUser({
                id: '',
                passwd: ''
            })
        });

        //history.push('/');
    }

    return(
        <AuthFormBlock>
            <h2>
                체육 시간, <br/>
                준비됐나요?
            </h2>
            <h3>로그인</h3>
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
            <StyleButton 
                cyan
                fullWidth  
                type="button"
                onClick={ onClick }      
            >
                로그인
            </StyleButton>
            <Footer>
                <Link to="/auth/register">Sign Up</Link>
            </Footer>
        </AuthFormBlock>
    )
}
export default withRouter(LoginFormBlock);
