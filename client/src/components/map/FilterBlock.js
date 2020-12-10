import React from 'react';
import styled from 'styled-components';
import Close from '../../lib/styles/img/close.svg';
import Archery from '../../lib/styles/img/img_category/archery.png';
import Badminton from '../../lib/styles/img/img_category/badminton.png';
import Baseball from '../../lib/styles/img/img_category/baseball.png';
import Basketball from '../../lib/styles/img/img_category/basketball.png';
import Etc from '../../lib/styles/img/img_category/etc.png';
import Football from '../../lib/styles/img/img_category/football.png';
import Golf from '../../lib/styles/img/img_category/golf.png';
import Multi from '../../lib/styles/img/img_category/multi.png';
import Soccer from '../../lib/styles/img/img_category/soccer.png';
import Tennis from '../../lib/styles/img/img_category/tennis.png';
import Volleyball from '../../lib/styles/img/img_category/volleyball.png';

const FilterWrap = styled.div`
    position: fixed;
    width: 400px;
    height: 400px;
    margin-top: 100px;
    font-size:12px;
    border-radius: 10px;
    text-align: center;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    z-index: 2;
`;

const FilterHeader = styled.div` 
    text-align: right;
`;

const FilterArticle = styled.div`
    text-align: center;
    color: #27AE60;
`;

const FilterCloseButton = styled.button`
    background-color: #ffffff;
    border: none;
`;

const FilterContents = styled.div`
    width: 100%;
`;

const FilterRow = styled.div`
    width: 100%;
    height: 60px;
    text-align: center;
    margin-bottom: 2rem;
`;

const FilterItem = styled.div`
    width: 80px;
    height: 80px;
    display: inline-block;
    border: none;
    background-color: #ffffff;
`;

const FilterImage = styled.img`
    width: 70px;
    height: 70px;
`;

const FilterText = styled.span`
    width: 90px;
    height: 10px;
`;

const FilterBlock = ({ onClickFilter, onHandleFilter }) => {
    return(
        <FilterWrap>
            <FilterHeader>
                <FilterCloseButton
                    onClick={ onClickFilter }
                >
                    <img src={ Close } />
                </FilterCloseButton>
            </FilterHeader>
            <FilterArticle>
                <h2>어떤 종목에 관심있으신가요?</h2>
            </FilterArticle>
            <FilterContents>
                <FilterRow>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Soccer } />
                        <FilterText>
                            축구
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Soccer } />
                        <FilterText>
                            풋살
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Basketball } />
                        <FilterText>
                            농구
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Volleyball } />
                        <FilterText>
                            배구
                        </FilterText>
                    </FilterItem>
                </FilterRow>
                <FilterRow>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Badminton } />
                        <FilterText>
                            배드민턴
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Tennis } />
                        <FilterText>
                            테니스/정구
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Baseball } />
                        <FilterText>
                            야구
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Golf } />
                        <FilterText>
                            골프/게이트볼
                        </FilterText>
                    </FilterItem>
                </FilterRow>
                <FilterRow>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Archery } />
                        <FilterText>
                            양궁/국궁
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Archery } />
                        <FilterText>
                            사격
                        </FilterText>
                    </FilterItem>
                    <FilterItem
                        onClick={ onHandleFilter }
                    >
                        <FilterImage src={ Etc } />
                        <FilterText>
                            기타
                        </FilterText>
                    </FilterItem>
                </FilterRow>
            </FilterContents>
        </FilterWrap>
    );
};

export default FilterBlock;