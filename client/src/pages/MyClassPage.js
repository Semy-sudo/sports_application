import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ClassContents from '../components/myPage/ClassContents';

const MyClassPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const MyClassPage = () => {
    return(
        <MyClassPage_Contents>
            <ClassContents/>
        </MyClassPage_Contents>
    );
};



export default MyClassPage;