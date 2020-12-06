import React from 'react';
import styled from 'styled-components';
import PaymentContents from '../components/payment/PaymentContents';

const PaymentWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: #dcdcdc;
    text-align: center;
`;

const PaymentPage = () => {
    return(
        <PaymentWrap>
            <PaymentContents/>
        </PaymentWrap>
    );
};

export default PaymentPage;