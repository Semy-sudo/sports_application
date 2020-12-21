import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import AppliedContents from '../components/myPage/AppliedContents';

const MyClassPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const AppliedClassPage = () => {
    return(
        <MyClassPage_Contents>
            <AppliedContents/>
        </MyClassPage_Contents>
    );
};



export default AppliedClassPage;