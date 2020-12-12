import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ClassViewDetail from '../components/board/ClassViewDetail';
import ClassTemplate from '../components/auth/ClassTemplate';

const MyClassPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const ClassDetail = ({ history, location }) => {
    return(
        <ClassTemplate>
            <ClassViewDetail
                history={ history }
                location={ location }
            />
        </ClassTemplate>
    );
};



export default ClassDetail;
