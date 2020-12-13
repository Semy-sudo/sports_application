import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyPaymentEl from './MyPaymentEl';
import Arrow from '../../lib/styles/img/arrow-back-outline.svg';
import axios from 'axios';

const WhiteBox = styled.div`
    width: 80%;
    height: 500px;
    margin-top: 50px;
    display: inline-block;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    width: 90%;
    height: 100px;
    display: inline-block;
    border-bottom: 1px solid #dcdcdc;
`;

const HeaderHeader = styled.div`
    width: 90%;
    text-align: left;
    cursor: pointer;
`;

const HeaderContents = styled.div`
    width: 90%;
    text-align: left;
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
`;

const Contents = styled.div`
    width: 90%;
    height: 500px;
    display: inline-block;
`;

const MyPaymentContentsBlock = ({ history }) => {
    const [paymentList, setPaymentList] = useState([]);
    const onHandleBack = e => {
        e.preventDefault();    

        history.goBack();
    };

    useEffect(() => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        async function getData() {
            var res = await axios.get(`/api/payment/${JSON.parse(localStorage.getItem("user")).userId}`, config);
            
            setPaymentList(res.data);
        } 

        getData();
    }, []);

    return(
        <Header>
            <WhiteBox>
                <Header>
                    <HeaderHeader
                        onClick={ onHandleBack }
                    >
                        <img src={ Arrow } />
                    </HeaderHeader>
                    <HeaderContents>
                        결제 내역
                    </HeaderContents>
                </Header>
                <Contents>
                    {
                        paymentList &&
                        paymentList.map(
                            (payment, i) => {
                                return(
                                    <MyPaymentEl
                                        payment={ payment }
                                    />
                                )
                            }
                        )
                    }
                </Contents>
            </WhiteBox>
        </Header>
    );
};

export default MyPaymentContentsBlock;