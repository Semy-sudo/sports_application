import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ContentsBlock from '../components/myPage/ConetentsBlock';

const MyPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const MyPage = () => {
    return(
        <MyPage_Contents>
            <ContentsBlock/>
        </MyPage_Contents>
    );
};



export default MyPage;