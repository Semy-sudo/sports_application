import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const BarArea = styled.div`
    position: absolute;
    width: 250px;
    height: 500px;
    top: 0;
    left: 0;
    bottom: 0;
    margin: 150px 0 30px 10px;
    padding: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
    font-size:12px;
    border-radius: 10px;
`;

const Option = styled.div`
    text-align: center;
    p {
        margin: 10px 0;
    }
`;

const BarHeader = styled.div`
    text-align: left;
    width: 90%;
    height: 35px;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: 1px soild #000000;
`;

const SearchBar = styled.input`
    width: 67%;
`;

const SearchButton = styled.button`
    border-radius: 5px;
    background-color: ${palette.cyan[4]};
    width: 30%;
    height: 25px;
    margin-left: 5px;
    border: none;
    color: white;
`;

const SearchBarBlock = () => {
    return(
        <BarArea>
            <Option>
                <BarHeader>
                    <form onSubmit="">
                        <SearchBar/>
                        <SearchButton>
                            검색
                        </SearchButton>
                        <hr/>
                    </form>
                </BarHeader>
            </Option>
        </BarArea>
    )
};

export default SearchBarBlock;