import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom'
import BoardMap from '../board/BoardMap';
import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '../common/Button';

const Table_Row = styled.td `
    width: 100px;
    height: 100px;
    text-align: center;
`;

const Contents_Title = styled.div `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    font-weight: bold; 
    font-size: 20px; 
    color: rgb(39, 174, 96);
`;
const Contents_Title_Line = styled.div `
    top: 135px;
    left: 333px;
    width: 800px;
    height: 3px;
    background-color: rgb(39, 174, 96);
`;

const Contents_Detail_Text = styled.div `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 100*100;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    font-weight: bold; 
    font-size: 15px;
    margin-left: 20px;
    margin-right: 20px;
`;

const Table_Layout = styled.div `
    width: 100%;
    margin-top: 50px;
`;

const Table_Text = styled.div `
    float: left;
    margin-left: 20px;
    line-height: 100px;
    font-size: 20px;
`;

const Shortcut_Area = styled.span `
    float: right;
    margin-top: 25px;
`;

const Input_Detail = styled.input `
    padding: 6px 12px;
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
    data-text-content="true";
`;
const ButtonBack = styled(Button)`
    margin-top: 1rem;
    width: 10%;
    float: right;
`;
const Contents = styled.div `
    float: left;
    margin-top: 100px;
    width: 100%;
    height: 800px;
`;

const ButtonWidthMarginTop = styled(Button)`
    margin-top: 1rem;
    width: 20%;
    float: right;
`;

class ViewDetailContents extends React.Component {

    render() {
        return (
            <div>
                {/* <TableCell align="left">{this.props.boardTitle}</TableCell>
                <TableCell align="left">{this.props.boardContents}</TableCell> */}
                <Contents>
            <Table_Layout>
                <Table_Text>
                    <Contents_Title>클래스 신청하기</Contents_Title>
                    <Contents_Title_Line></Contents_Title_Line>
                </Table_Text>
                <table>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                            <h4>등록날짜:{this.props.CREATEDATE}</h4>
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                            <h4>{this.props.boardTitle}</h4>
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="half_left_line">
                            <div data-image-content="true">

                            {/* <BoardMap mapData={mapData}></BoardMap> */}

                            </div>
                        </td>
                        <td className="half_right_line">
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>수강료:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                <h4>{this.props.boardpay}</h4>
                                </Shortcut_Area>
                            </tr>
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>최소인원:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                <h4>{this.props.boardmin}</h4>
                                </Shortcut_Area>
                            </tr>
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>최대인원:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                <h4>{this.props.boardmax}</h4>
                                </Shortcut_Area>
                            </tr>

                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
            <h4>기간: {this.props.startDate}~{this.props.finishDate} 시간: {this.props.startTime}~{this.props.finishTime}</h4>

                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                            <h4>{this.props.boardContents}</h4>
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">

                            <ButtonWidthMarginTop
                                cyan="cyan"
                                fullWidth="fullWidth"
                                type="button"
                                onClick={ 
                                    () => {
                                        this.props.history.push(`/payment?paymentMoney=${this.props.boardpay}&paymentContents=${this.props.boardTitle}`);
                                    }
                                }
                            >
                                등록&결제
                            </ButtonWidthMarginTop>

                        </td>
                    </tr>
                </table>
            </Table_Layout>
        </Contents>
            </div>
        )
    }
}



export default ViewDetailContents;