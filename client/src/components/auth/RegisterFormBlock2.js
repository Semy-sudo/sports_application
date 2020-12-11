import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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

const RegisterFormBlock = ({ history }) => {
    const [error, setError] = useState('');
    const [certifiState, setCertifiState] = useState(false);
    const [board, setUser] = useState(
        {
            classKind: '',
            boardType: '',
            boardpay: ''
        }
    );
    const changeField = e => {
        setUser({
            ...board,
            [e.target.name]: e.target.value
        })
    };
    const onCertifiButtonClick = e => {
        setCertifiState(true);
    };

    const onClick = e => {
        if([board.id, board.passwd, board.passwdConfirm, board.email].includes('')) {
            setError('빈 칸을 모두 입력하세요');

            return;
        }

      

        if(board.type === '') {
            setError('회원가입 버튼을 한번 더 눌러주세요');

            return;
        } 

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post('/api/auth/class', {
                classKind: board.classKind,
                boardType: board.boardType,
                boardpay: board.boardpay
            },
            config
        ).then( (response) => {
            setUser({
                classKind: '',
                boardType: '',
                boardpay: '',
            })
        });

        history.push('/');
    };

    return(
        <AuthFormBlock>
            <AuthFormBlockHeader>
                <Header_Header>
                    <h3>클래스 등록</h3>
                </Header_Header>
                <Header_Footer>
                    <Button_Certification
                        onClick={ onCertifiButtonClick }
                    >
                        지도사로 가입하려면?
                    </Button_Certification>
                </Header_Footer>
            </AuthFormBlockHeader>
            <StyledInput 
                autoComplete="classKind"
                name="classKind"
                placeholder="classKind"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardType"
                name="boardType"
                placeholder="boardType"
                type="text"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardpay"
                name="boardpay"
                placeholder="boardpay"
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
                클래스 등록
            </StyleButton>
            <Footer>
                <Link to="/auth/login">Login</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default withRouter(RegisterFormBlock);