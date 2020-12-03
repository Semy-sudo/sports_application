import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../components/common/Icon.css';
import soccer from '../../lib/styles/img/football-outline.svg';
import footsal from '../../lib/styles/img/img_category/sepak_takraw.png';
import basketball from '../../lib/styles/img/basketball-outline.svg';
import baseball from '../../lib/styles/img/baseball-outline.svg';
import volleyball from '../../lib/styles/img/img_category/volleyball.png';

const Contents = styled.div`
    float: left;
    margin-top: 200px;
    width: 100%;
    height: 800px;
`;

const Contents_table = styled.table`
    text-align: center;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
`;

const Table_td = styled.td`
    width: 80px;
    height: 130px;
    text-align: center;
`;

const ContentsBlock = () => {
    return(
        <Contents>
            <Contents_table>
                <tr>
                    <Table_td>
                        <Link to="#">
                            <div className="contents_category_area">
                                <img src={ soccer } />
                            </div>
                            <span className="contents_">
                                축구
                            </span>
                        </Link>
                    </Table_td>
                    <Table_td>
                        <Link to="#">
                            <div class="contents_category_area">
                                <img src={ footsal } />
                            </div>
                            <span class="contents_">
                                풋살
                            </span>
                        </Link>
                    </Table_td>
                    <Table_td>
                        <Link to="#">
                            <div class="contents_category_area">
                                <img src={ basketball } />
                            </div>
                            <span class="contents_">
                                실내 농구
                            </span>
                        </Link>
                    </Table_td>
                    <Table_td>
                        <Link to="#">
                            <div class="contents_category_area">
                                <img src={ basketball } />
                            </div>
                            <span class="contents_">
                                야외 농구
                            </span>
                        </Link>
                    </Table_td>
                    <Table_td>
                        <Link to="#">
                            <div class="contents_category_area">
                                <img src={ baseball } />
                            </div>
                            <span class="contents_">
                                야구
                            </span>
                        </Link>
                    </Table_td>
                    <Table_td>
                        <Link to="#">
                            <div class="contents_category_area">
                                <img src={ volleyball } />
                            </div>
                            <span class="contents_">
                                배구
                            </span>
                        </Link>
                    </Table_td>
                </tr> 
            </Contents_table>
        </Contents>
    );
};

export default ContentsBlock;