import React from 'react';
import styled from 'styled-components';
import Close from '../../lib/styles/img/close.svg';

const PlaceWrap = styled.div`
    position: fixed;
    width: 250px;
    height: 300px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 2;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const PlaceHeader = styled.div`
    text-align: right;
`;

const PlaceContents = styled.div`
    width: 200px;
    height: 50px;
    padding-top: 5px;
    display: inline-block;
    border-bottom: 1px solid #dcdcdc;
`;

const PlaceInput = styled.input`
    float: left;
    width: 150px;
    height: 30px;
    background-color: #dcdcdc;
    border: 1px solid gray;
`;

const PlaceButton = styled.button`
    float: left;
    width: 50px;
    height: 30px;
    border: none;
    background-color: #27AE60;
    text-align: center;
    color: #ffffff;
`;

const PlaceImageButton = styled.button`
    background-color: #ffffff;
    border: none;
`;

const PlaceArticle = styled.div`
    width: 200px;
    display: inline-block;
    margin-top: 10px;
    text-align: left;
`;

const PlaceSearchBlockParent = ({ onHandlePlace, onClickPlace }) => {
    return(
        <PlaceWrap>
            <PlaceHeader>
                <PlaceImageButton
                    onClick={ onClickPlace }
                >
                    <img src={ Close } />
                </PlaceImageButton>
            </PlaceHeader>
            <PlaceContents>
                <PlaceInput
                    id='place'
                    placeholder="지역을 입력해주세요"
                />
                <PlaceButton
                    onClick={ onHandlePlace }
                >
                    검색
                </PlaceButton>
            </PlaceContents>
            <PlaceArticle>
                ex) 서울특별시 중구
                <br/>
                ex) 부산광역시 사하구
                <br/>
                ex) 경기도 용인시
                <br/>
                ex) 경상남도 산청군
            </PlaceArticle>
        </PlaceWrap>
    );
};

export default PlaceSearchBlockParent;