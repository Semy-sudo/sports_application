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

const CustomerAdd = ({ history, search }) => {
    const [error, setError] = useState('');
    const [user, setUser] = useState(
        {
            boardType: '',
            boardLimit: '',
            boardTitle: '',
            boardContents: '',
        }
    );
    const changeField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };


    const onClick = e => {
        if([user.boardType, user.boardLimit, user.boardTitle, user.boardContents].includes('')) {
            setError('빈 칸을 모두 입력하세요');

            return;
        }

        if(user.boardType === '') {
            setError('등록 버튼을 한번 더 눌러주세요');

            return;
        } 

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post('/api/classopen', {
                boardType: user.boardType,
                boardLimit: user.boardLimit,
                boardTitle: user.boardTitle,
                boardContents: user.boardContents,
            },
            config
        ).then( (response) => {
            setUser({
                boardType: '',
                boardLimit: '',
                boardTitle: '',
                boardContents: '',
            })
        });

        history.push('/');
    };

    return(
        <AuthFormBlock>
            <AuthFormBlockHeader>
                <Header_Header>
                    <h3>Class 글쓰기</h3>
                </Header_Header>
            </AuthFormBlockHeader>
            <StyledInput 
                autoComplete="boardType"
                name="boardType"
                placeholder="종류"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardLimit"
                name="boardLimit"
                placeholder="기간"
                type="text"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardTitle"
                name="boardTitle"
                placeholder="제목"
                type="text"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardContents"
                name="boardContents"
                placeholder="내용"
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
                등록하기
            </StyleButton>
            <Footer>
                <Link to="/auth">MYPAGE</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default withRouter(CustomerAdd);