import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import RentContents from '../components/myPage/RentContents';

const MyClassPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const RentPage = () => {
    return(
        <MyClassPage_Contents>
            <RentContents/>
        </MyClassPage_Contents>
    );
};



export default RentPage;