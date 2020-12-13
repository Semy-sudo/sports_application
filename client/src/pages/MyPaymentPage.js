import React from 'react';
import styled from 'styled-components';
import MyPaymentContentsBlock from '../components/myPage/MyPaymentContentsBlock';

const Wrap = styled.div`
    float: left;
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 100px;
    background-color: #dcdcdc;
`;

const MyPamentPage = ({ history }) => {
    return(
        <Wrap>
            <MyPaymentContentsBlock
                history={ history }
            />
        </Wrap>
    )
};

export default MyPamentPage;