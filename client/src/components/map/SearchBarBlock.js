import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import PlaceSearchBlock from './PlaceSearchBlock';
import FilterBlock from './FilterBlock';

const BarArea = styled.div`
    float: left;
    width: 30%;
    height: 100%;
    margin-top: 100px;
    font-size:12px;
    border-radius: 10px;
    text-align: center;
`;

const BarHeader = styled.div`
    display: inline-block;
    width: 90%;
    height: 120px;
    border-bottom: 1px solid #dcdcdc;
`;

const BarHeader_Header = styled.div`
    text-align: left;
    color: #27AE60;
`;

const BarHeader_Contents = styled.div`
    float: left;
    width: 80%;
    text-align: left;
`;

const BarHeader_Contents_Place_Button = styled.button`
    border: none;
    background-color: #ffffff;
`;

const BarHeader_Contents_Button_Area = styled.div`
    float: left;
    width: 20%;
    text-align: right;
`;

const BarHeader_Contents_Button = styled.button`
    background-color: #ffffff;
    border-radius: 20px;
    font-size: 12px;
    text-align: center;
`;

const BarContents = styled.div`
    display: inline-block;
    width: 90%;
    margin-top: 40px;
`;

const SearchBar = styled.input`
    width: 80%;
    height: 24px;
    border: 1px solid gray;
`;

const SearchButton = styled.button`
    width: 20%;
    height: 24.5px;
    background-color: #27AE60;
    color: #ffffff;
    border: none;
`;

const SearchBarBlock = ({ 
    onClick, place, onHandlePlace, onClickPlace, placeValue,
    onClickFilter, filter, onHandleFilter
}) => {

    return(
        <BarArea>
            <BarHeader>
                <BarHeader_Header>
                    <h2>
                        수업 어디서 진행할지 <br/>
                        고민된다면..?
                    </h2>
                </BarHeader_Header>
                <BarHeader_Contents>
                    <b>
                        지금 보고 있는 지역은
                        <BarHeader_Contents_Place_Button
                            onClick={ onClickPlace }
                        >
                            { 
                                placeValue ?
                                placeValue :
                                '선택'
                            }
                        </BarHeader_Contents_Place_Button>
                    </b>
                </BarHeader_Contents>
                <BarHeader_Contents_Button_Area>
                    <BarHeader_Contents_Button
                        onClick={ onClickFilter }
                    >
                        필터
                    </BarHeader_Contents_Button>
                </BarHeader_Contents_Button_Area>
                {
                    place &&
                    <PlaceSearchBlock
                        onHandlePlace={ onHandlePlace }
                        onClickPlace={ onClickPlace }
                    />
                }
                {
                    filter &&
                    <FilterBlock
                        onClickFilter={ onClickFilter }
                        onHandleFilter={ onHandleFilter }
                    />
                }
            </BarHeader>
            <BarContents>
                <SearchBar
                    id="keyword"
                    placeholder="클래스명을 입력해주세요"
                />
                <SearchButton
                    onClick={ onClick }
                >
                    검색
                </SearchButton>
            </BarContents>
        </BarArea>
    )
};

export default SearchBarBlock;