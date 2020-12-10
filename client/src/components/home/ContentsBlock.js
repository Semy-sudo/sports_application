import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import mainimg from '../../lib/styles/img/img_category/mainimg.jpg';
//import mainfont from '../../lib/styles/img/img_category/mainfont.png';
import Button from '../common/Button';
import OnedayClass from './OnedayClass';
import RegularClass from './RegularClass';

const ButtonWidthMarginTop = styled(Button)`
    margin-top: 1rem;
    width: 50%;
`;

const Contents = styled.div `
    float: left;
    margin-top: 200px;
    width: 100%;
    height: 800px;
`;

const Contents_table = styled.table `
    text-align: center;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
`;

const Contents_table_class = styled.table `
    text-align: center;
    margin-top: 50px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`;

const Table_td = styled.td `
    width: 50px;
    height: 130px;
    text-align: center;
    margin-left: 2em;
    margin-right: 1em;
`;

const Main_img = styled.img `
    width: 600px;
    height: 300px;
    margin:0;
    padding:0;
`;




const ContentsBlock = () => {

    return (
            <Contents>
                <Contents_table>

                    <Table_td>
                        <Link to="#">
                            <Main_img src={mainimg} width="300" height="300"/>
                        </Link>
                    </Table_td>
                </Contents_table>
                <Contents_table>
                    <Table_td>
                        <Link to="/OpenClass">
                            <h2>총 90개의 클래스가 오픈되어있어요!</h2>
                            <ButtonWidthMarginTop cyan="cyan" fullWidth="fullWidth">
                                나도 클래스 오픈해볼까
                            </ButtonWidthMarginTop>
                        </Link>
                    </Table_td>
                </Contents_table>
                <Contents_table_class>
                    <Table_td>
                        <OnedayClass/>
                    </Table_td>
                    <Table_td>
                        <RegularClass/>
                    </Table_td>
                </Contents_table_class>
                <Contents_table_class>
                <h2>아니 이런 클래스도 있다고?</h2>
                #놓칠 수 없는. 이색. 체육수업.            
                </Contents_table_class>
                <Contents_table_class>
                <h2>선생님들 주목!</h2>
                #만족도 최상. 인기 있는 대관장소 Top3
                </Contents_table_class>
            </Contents>
        

    );
};

export default ContentsBlock;