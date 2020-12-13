import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import '../../components/common/table.css';
import '../../components/common/Icon.css';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import axios from "axios";
import MyAppiedSet from './MyAppiedSet';

const Table_Layout = styled.div`
    width: 50%;
    height: 500px;
    margin-top: 50px;
    display: inline-block;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const Table_Text = styled.div`
    float: left;
    margin-left: 20px;
    line-height: 100px;
    font-size: 20px;
`;

const Shortcut_Area = styled.span`
    float: right;
    margin-top: 25px;
`;

const Button_Logout = styled.button`
    width: 50%;
    height: 50px;
    background-color: ${palette.cyan[4]};
    border: 0px solid ${palette.cyan[4]};
    color: white;
    font-size: 20px;
    border-radius: 10px;
`;


const AppliedContents = () => {

    return(
        <Table_Layout>
            <MyAppiedSet/>
        </Table_Layout>
    );
};

export default AppliedContents;
