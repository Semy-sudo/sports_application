import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const Wrap = styled.div`
    position: fixed;
    width: 400px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 3rem;
    margin-left: 50px;
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

const ButtonArea = styled.div`
    float: left;
    width: 50%;
    margin-top: 1rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const RegisterCertification = ({
    onRegister,
    onCancel,
    onChange,
    error
}) => {
    return(
        <Wrap>
            <StyledInput 
                id="certifiGrade"
                name="certifiGrade"
                placeholder="자격 등급명) 2급 생활 스포츠 지도사"
                onChange={ onChange }
            />
            <StyledInput 
                id="certifiName"
                name="certifiName"
                placeholder="자격 종목명) 요가"
                onChange={ onChange }
            />
            <StyledInput 
                id="certifiDate"
                name="certifiDate"
                placeholder="취득일자) 19990101"
                onChange={ onChange }
            />
            { error && <ErrorMessage>{ error }</ErrorMessage> }
            <ButtonArea>
                <StyleButton
                    cyan
                    halfWidth
                    onClick={ onRegister }
                >
                    확인
                </StyleButton>
            </ButtonArea>
            <ButtonArea>
                <StyleButton
                    halfWidth
                    onClick={ onCancel }
                >
                    취소
                </StyleButton>
            </ButtonArea>
        </Wrap>
    );
};

export default RegisterCertification;