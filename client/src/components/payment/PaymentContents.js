import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Contents = styled.div`
    width: 60%;
    height: 400px;
    margin-top: 30px;
    display: inline-block;
    background-color: #f2f2f2;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

const ContentsTable = styled.table`
    float: left;
    width: 100%;
    margin: 2rem;
`;

const ContentsTableTr = styled.tr`
    width: 100%;
`;

const ContentsElTitle = styled.td`
    float: left;
    width: 50%;
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
`;

const ContentsElContents = styled.td`
    float: left;
    width: 50%;
    margin-top: 10px;
    text-align: left;
`;

const ContentsElFooter = styled.td`
    width: 100%;
    text-align: center;
`;

const ContentsElFooterButton = styled.button`
    margin-top: 30px;
    width: 70%;
    height: 70px;
    background-color: #27AE60;
    color: #ffffff;
    border: none;
`;

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

const PaymentContents = ({ history, paymentData }) => {
    const onClick = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        await axios.post('/api/payment', {
                paymentDate: getToday(),
                paymentPlace: "체육동산",
                paymentThing: "카카오페이",
                paymentMoney: paymentData.paymentMoney,
                // userName: JSON.parse(localStorage.getItem("user")).id,
                // userTel: JSON.parse(localStorage.getItem("user")).email,
                paymentContents: paymentData.paymentContents,
                // userId: JSON.parse(localStorage.getItem("user")).userId,
            },
            config
        )

        history.push('/');
    };

    return(
        <Contents>
            <ContentsTable>
                <ContentsTableTr>
                    <ContentsElTitle>
                        일시
                    </ContentsElTitle>
                    <ContentsElContents>
                        { getToday() }
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        구매처
                    </ContentsElTitle>
                    <ContentsElContents>
                        체육동산
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        결제수단
                    </ContentsElTitle>
                    <ContentsElContents>
                        카카오페이
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        결제금액
                    </ContentsElTitle>
                    <ContentsElContents>
                        { paymentData.paymentMoney }
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        사용자명
                    </ContentsElTitle>
                    <ContentsElContents>
                        { JSON.parse(localStorage.getItem("user")).id }
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        이메일
                    </ContentsElTitle>
                    <ContentsElContents>
                        { JSON.parse(localStorage.getItem("user")).email }
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        결제 내역
                    </ContentsElTitle>
                    <ContentsElContents>
                        { paymentData.paymentContents }
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsElFooter>
                    <ContentsElFooterButton
                        onClick={ onClick }
                    >
                        <h1>결제하기</h1>
                    </ContentsElFooterButton>
                </ContentsElFooter>
            </ContentsTable>
        </Contents>
    );
};

export default PaymentContents;