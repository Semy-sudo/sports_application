import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import DaumPostcode from 'react-daum-postcode';

const AuthFormBlock = styled.div`
    h3 { 
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
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

const BasicAddressInput = styled.input`
    float: left;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 70%;
    margin-top: 1rem;
    &:focus: {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const DetailAddressInput = styled.input`
    float: left;
    margin-top: 1rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    margin-top: 1rem;
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

const DropDownArea = styled.div`
    width: 50%;
    margin-bottom: 1rem;
`;

const AddressSearch = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const postCodeStyle = {
    width: "100%",
    height: "500px",
};

const options = [
    {
        value: 'parent',
        label: '부모님',
    },
    {
        value: 'expert',
        label: '지도사',
    },
];

const RegisterFormBlock = ({ form, onChange, onSubmit, error, onDropdownChange, setAddress, registerType }) => {
    
    const handleComplete = data => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
            if (data.bname !== '') {
            extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        document.getElementById("addressBasic").value = fullAddress;
        setAddress(fullAddress);
    };

    return(
        <AuthFormBlock>
            <h3>회원가입</h3>
            <form onSubmit={ onSubmit }>
                <DropDownArea>
                    <Dropdown
                        options={options} 
                        value={options[0]}
                        onChange={ onDropdownChange }
                    />
                </DropDownArea>
                { 
                    registerType === "parent" 
                    ?
                    <div>
                        <StyledInput autoComplete="id"
                                     name="id"
                                     placeholder="ID"
                                     onChange={ onChange }
                                     value={ form.id }
                        />
                        <StyledInput autoComplete="new-password"
                                     name="passwd"
                                     placeholder="Password"
                                     type="password"
                                     onChange={ onChange }
                                     value={ form.passwd }
                        />
                        <StyledInput autoComplete="new-password"
                                     name="passwdConfirm"
                                     placeholder="Re-Password"
                                     type="password"
                                     onChange={ onChange }
                                     value={ form.passwdConfirm }
                        />
                        <StyledInput autoComplete="email"
                                     name="email"
                                     placeholder="Email"
                                     type="text"
                                     onChange={ onChange }
                                     value={ form.email }
                        />
                        <BasicAddressInput id="addressBasic"
                                           name="addressBasic"
                                           placeholder="주소"
                                           type="text"
                                           onChange={ onChange }
                                           readOnly
                        />
                        <DetailAddressInput name="addressDetail"
                                            placeholder="상세주소"
                                            type="text"
                                            onChange={ onChange }
                                            value={ form.addressDetail }
                        />
                        <AddressSearch>
                            <DaumPostcode
                                style={ postCodeStyle }
                                onComplete={ handleComplete }
                            />
                        </AddressSearch>
                    </div>
                    :
                    <div>
                        <StyledInput autoComplete="id"
                                     name="id"
                                     placeholder="ID"
                                     onChange={ onChange }
                                     value={ form.id }
                        />
                        <StyledInput autoComplete="new-password"
                                     name="passwd"
                                     placeholder="Password"
                                     type="password"
                                     onChange={ onChange }
                                     value={ form.passwd }
                        />
                        <StyledInput autoComplete="new-password"
                                     name="passwdConfirm"
                                     placeholder="Re-Password"
                                     type="password"
                                     onChange={ onChange }
                                     value={ form.passwdConfirm }
                        />
                        <StyledInput autoComplete="email"
                                     name="email"
                                     placeholder="Email"
                                     type="text"
                                     onChange={ onChange }
                                     value={ form.email }
                        />
                        <StyledInput name="certifiNumber"
                                     placeholder="Your Certification Number"
                                     type="text"
                                     onChange={ onChange }
                                     value={ form.certifiNumber }
                        />
                    </div>                             
                }
                { error && <ErrorMessage>{ error }</ErrorMessage> }
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