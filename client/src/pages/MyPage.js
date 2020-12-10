import React from 'react';
import styled from 'styled-components';
import ContentsBlock from '../components/myPage/ConetentsBlock';

const MyPage_Contents = styled.div`
    float: left;
    margin-top: 100px;
    width: 100%;
    height: 100%;
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