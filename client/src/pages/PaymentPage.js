import React from 'react';
import styled from 'styled-components';
import PaymentContents from '../components/payment/PaymentContents';
import BoardSearchMap from '../components/board/BoardSearchMap';

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

const PaymentPage = () => {
    return(
        // <PaymentWrap>
        //     <PaymentHeader>
        //         <h2><b>결제하기</b></h2>
        //     </PaymentHeader>
        //     <PaymentContents/>
        // </PaymentWrap>
        <BoardSearchMap />
    );
};

export default PaymentPage;