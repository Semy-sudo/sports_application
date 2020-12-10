import React from 'react';
import styled from 'styled-components';

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

const PaymentContents = () => {
    const onClick = e => {
        e.preventDefault();
    };

    return(
        <Contents>
            <ContentsTable>
                <ContentsTableTr>
                    <ContentsElTitle>
                        일시
                    </ContentsElTitle>
                    <ContentsElContents>
                        2020.02.22
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
                        30000
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        사용자명
                    </ContentsElTitle>
                    <ContentsElContents>
                        김나희
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        전화번호
                    </ContentsElTitle>
                    <ContentsElContents>
                        010-1234-5678
                    </ContentsElContents>
                </ContentsTableTr>
                <ContentsTableTr>
                    <ContentsElTitle>
                        결제 내역
                    </ContentsElTitle>
                    <ContentsElContents>
                        장수축구장 체육동산차량
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