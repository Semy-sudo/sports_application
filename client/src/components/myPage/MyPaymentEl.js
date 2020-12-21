import React from 'react';
import styled from 'styled-components';

const ContentsEl = styled.div`
    width: 90%;
    height: 20px;
    margin-top: 20px;
    text-align: left;
`;

const ContentsElHeader = styled.div`
    float: left;
    width: 40%;
`;

const ContentsElMiddle = styled.div`
    float: left;
    width: 40%;
`;

const ContentsElFooter = styled.div`
    float: left;
    width: 20%;
`;

const MyPayementEl = ({ payment }) => {
    return(
        <ContentsEl>
            <ContentsElHeader>
                { payment.paymentContents }
            </ContentsElHeader>
            <ContentsElMiddle>
                { payment.paymentDate }
            </ContentsElMiddle>
            <ContentsElFooter>
                { payment.paymentMoney }
            </ContentsElFooter>
        </ContentsEl>
    );
};

export default MyPayementEl