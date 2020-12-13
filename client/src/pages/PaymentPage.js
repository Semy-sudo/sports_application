import React from 'react';
import styled from 'styled-components';
import PaymentContents from '../components/payment/PaymentContents';
import qs from 'querystring';

const PaymentWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    text-align: center;
`;

const PaymentHeader = styled.div`
    margin-top: 130px;
    width: 70%;
    display: inline-block;
    color: #27AE60;
    text-align: left;
`;

const PaymentPage = ({ history, location }) => {
    var params = qs.parse(location.search)
    var keys = Object.keys(params);
    var values = Object.values(params);
    var paymentData = new Object();

    for(var i = 0; i < Object.keys(params).length; i++) {
        paymentData[keys[i]] = values[i]
    }

    return(
        <PaymentWrap>
            <PaymentHeader>
                <h2><b>결제하기</b></h2>
            </PaymentHeader>
            <PaymentContents
                history={ history }
                paymentData={ paymentData }
            />
        </PaymentWrap>
    );
};

export default PaymentPage;