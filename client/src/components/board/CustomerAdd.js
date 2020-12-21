import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../common/Button';
import {post} from 'axios';
import qs from 'qs';
import BoardMap from './BoardMap';
import BoardSearchMap from './BoardSearchMap';

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

const AuthFormBlock = styled.div `
    margin-top: 0px;
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

const Input_Title = styled.input `
    padding: 6px 12px;
    width: 400%;
    height: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
    data-text-content="true";
    type="text";
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

const Input_Contents = styled.input `
    padding: 100px 12px;
    width: 400%;
    height: 400%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-sizing: 100;
    font-size: 14px;
    data-text-content="true";
`;

const Input_Detail_Block = styled.input `
    background-color: rgb(224, 224, 224);
    text-align: center;
    padding: 181*24;
`;

const ButtonBack = styled(Button)`
    margin-top: 1rem;
    width: 10%;
    float: right;
`;

const ErrorMessage = styled.div `
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const CustomerAdd = ({history, location, search}) => {

    var params = qs.parse(location.search)
    var keys = Object.keys(params);
    var values = Object.values(params);
    var startDate = values[0].replace('?', "");
    var finishDate = values[1];
    var startTime = values[2];
    var finishTime = values[3];
    var FACI_NM = values[4];
    var mapData = new Object();
   
for (var i = 4; i < Object.keys(params).length; i++) {
        mapData[keys[i]] = values[i]
    }
    console.log("mapdata",mapData);

    console.log(mapData.FACI_NM);
    console.log(mapData);

    const [error, setError] = useState('');
    const [certifiState, setCertifiState] = useState(false);
    const [board, setBoard] = useState({
        classkind: '',
        boardTitle: '',
        boardpay: '',
        boardmin: '',
        boardmax: '',
        boardContents: '',
        startDate: startDate,
        finishDate: finishDate,
        startTime: startTime,
        finishTime: finishTime,
        mapData: {
            ADDR_AMD_CD: "",
            ADDR_AMD_NM: "",
            ADDR_CPB_CD: "",
            ADDR_CPB_NM: "",
            ADDR_CP_CD: "",
            ADDR_CP_NM: "",
            ADDR_EMD_CD: "",
            ADDR_EMD_NM: "",
            DEL_YN: "",
            FACI_GB_CD: "",
            FACI_GB_NM: "",
            FACI_HOMEPAGE: "",
            FACI_NM: "",
            FACI_POINT_X: "",
            FACI_POINT_Y: "",
            FACI_ROAD_ADDR1: "",
            FACI_STAT: "",
            FCOB_CD: "",
            FCOB_NM: "",
            FMNG_CPB_CD: "",
            FMNG_CPB_NM: "",
            FMNG_CP_CD: "",
            FMNG_CP_NM: "",
            FMNG_DEPT_NM: "",
            FMNG_TYPE_GB_CD: "",
            FMNG_TYPE_GB_NM: "",
            FMNG_USER_TEL: "",
            FTYPE_CD: "",
            FTYPE_NM: "",
            NATION_YN: "",
            STAND_CPT_PSN_CNT: "",
            STAND_SEAT_CNT: "",
            TOT_FACI_AREA: "",
        }    
    });

    const changeField = e => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value
        })
    };

    const onClick = e => {
        // if ([board.boardTitle, board.baordpay, board.boardmin, board.boardmax,
        // board.boardContents].includes('')) {     setError('빈 칸을 모두 입력하세요'); return; }

        if (board.type === '') {
            setError('등록 버튼을 한번 더 눌러주세요');

            return;
        }

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios
            .post('/api/classopen', {
                classkind: board.classkind,
                // nickName: JSON.parse(localStorage.getItem("user")).id,
                boardTitle: board.boardTitle,
                boardpay: board.boardpay,
                boardType: "123",
                boardmin: board.boardmin,
                boardmax: board.boardmax,
                boardContents: board.boardContents,
                startDate: board.startDate,
                finishDate: board.finishDate,
                startTime: board.startTime,
                finishTime: board.finishTime,
                ADDR_AMD_CD: mapData.ADDR_AMD_CD,
                ADDR_AMD_NM: mapData.ADDR_AMD_NM,
                ADDR_CPB_CD: mapData.ADDR_CPB_CD,
                ADDR_CPB_NM: mapData.ADDR_CPB_NM,
                ADDR_CP_CD: mapData.ADDR_CP_CD,
                ADDR_CP_NM: mapData.ADDR_CP_NM,
                ADDR_EMD_CD: mapData.ADDR_EMD_CD,
                ADDR_EMD_NM: mapData.ADDR_EMD_NM,
                DEL_YN: mapData.DEL_YN,
                FACI_GB_CD: mapData.FACI_GB_CD,
                FACI_GB_NM: mapData.FACI_GB_NM,
                FACI_HOMEPAGE: mapData.FACI_HOMEPAGE,
                FACI_NM: mapData.FACI_NM,
                FACI_POINT_X: mapData.FACI_POINT_X,
                FACI_POINT_Y: mapData.FACI_POINT_Y,
                FACI_ROAD_ADDR1: mapData.FACI_ROAD_ADDR1,
                FACI_STAT: mapData.FACI_STAT,
                FCOB_CD: mapData.FCOB_CD,
                FCOB_NM: mapData.FCOB_NM,
                FMNG_CPB_CD: mapData.FMNG_CPB_CD,
                FMNG_CPB_NM: mapData.FMNG_CPB_NM,
                FMNG_CP_CD: mapData.FMNG_CP_CD,
                FMNG_CP_NM: mapData.FMNG_CP_NM,
                FMNG_DEPT_NM: mapData.FMNG_DEPT_NM,
                FMNG_TYPE_GB_CD: mapData.FMNG_TYPE_GB_CD,
                FMNG_TYPE_GB_NM: mapData.FMNG_TYPE_GB_NM,
                FMNG_USER_TEL: mapData.FMNG_USER_TEL,
                FTYPE_CD: mapData.FTYPE_CD,
                FTYPE_NM: mapData.FTYPE_NM,
                NATION_YN: mapData.NATION_YN,
                STAND_CPT_PSN_CNT: mapData.STAND_CPT_PSN_CNT,
                STAND_SEAT_CNT: mapData.STAND_SEAT_CNT,
                TOT_FACI_AREA: mapData.TOT_FACI_AREA,
            }, config)
            .then((response) => {
                setBoard({
                    classkind: '',
                    boardTitle: '',
                    boardpay: '',
                    boardmin: '',
                    boardmax: '',
                    boardContents: '',
                    startDate: '',
                    finishDate: '',
                    startTime: '',
                    finishTime: '',
                    ADDR_AMD_CD: "",
                    ADDR_AMD_NM: "",
                    ADDR_CPB_CD: "",
                    ADDR_CPB_NM: "",
                    ADDR_CP_CD: "",
                    ADDR_CP_NM: "",
                    ADDR_EMD_CD: "",
                    ADDR_EMD_NM: "",
                    DEL_YN: "",
                    FACI_GB_CD: "",
                    FACI_GB_NM: "",
                    FACI_HOMEPAGE: "",
                    FACI_NM: "",
                    FACI_POINT_X: "",
                    FACI_POINT_Y: "",
                    FACI_ROAD_ADDR1: "",
                    FACI_STAT: "",
                    FCOB_CD: "",
                    FCOB_NM: "",
                    FMNG_CPB_CD: "",
                    FMNG_CPB_NM: "",
                    FMNG_CP_CD: "",
                    FMNG_CP_NM: "",
                    FMNG_DEPT_NM: "",
                    FMNG_TYPE_GB_CD: "",
                    FMNG_TYPE_GB_NM: "",
                    FMNG_USER_TEL: "",
                    FTYPE_CD: "",
                    FTYPE_NM: "",
                    NATION_YN: "",
                    STAND_CPT_PSN_CNT: "",
                    STAND_SEAT_CNT: "",
                    TOT_FACI_AREA: "",
                })
            });

        console.log(board);
        history.push(`/payment?paymentMoney=${((Number(finishDate.replace(/-/gi, "")) - Number(startDate.replace(/-/gi, ""))) * (Number(finishTime) - Number(startTime))) * 30000}&paymentContents=${mapData.FACI_NM}`);
    };

    return (
        <Contents>
            <Table_Layout>
                <Table_Text>
                    <Contents_Title>클래스 등록하기</Contents_Title>
                    <Contents_Title_Line></Contents_Title_Line>
                </Table_Text>
                <table>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                                <input name="classkind" type="checkbox" value="1" onChange={changeField}/>원데이 클래스
                                <input name="classkind" type="checkbox" value="2" onChange={changeField}/>정규클래스 {/* <input type="checkbox"/>
                                정규 클래스 */
                                }
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                                <Input_Title
                                    autoComplete="boardTitle"
                                    name="boardTitle"
                                    placeholder="제목을 적어주세요. (Ex. 축구할 친구들 모여라!)"
                                    type="text"
                                    onChange={changeField}/>
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="half_left_line">
                            <div data-image-content="true">

                                {
                                    mapData ?
                                    <BoardMap mapData={mapData}></BoardMap> :
                                    <BoardSearchMap
                                        history={ history }
                                        location={ location }                                    
                                    />
                                }
            </div>
                        </td>
                        <td className="half_right_line">
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>수강료:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                    <Input_Detail
                                        autoComplete="boardpay"
                                        name="boardpay"
                                        placeholder="원"
                                        type="text"
                                        onChange={changeField}/>
                                </Shortcut_Area>
                            </tr>
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>최소인원:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                    <Input_Detail_Block
                                        autoComplete="boardmin"
                                        name="boardmin"
                                        placeholder="명(수)"
                                        type="text"
                                        onChange={changeField}/>
                                </Shortcut_Area>
                            </tr>
                            <tr>
                                <Table_Text>
                                    <Contents_Detail_Text>최대인원:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                    <Input_Detail_Block
                                        autoComplete="boardmax"
                                        name="boardmax"
                                        placeholder="명(수)"
                                        type="text"
                                        onChange={ changeField }
                                    />
                                </Shortcut_Area>
                            </tr>

                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                                <h5>날짜/시간: {startDate}일 {startTime}시~ {finishDate}일 {finishTime}시 &nbsp; &nbsp; 장소: {FACI_NM}
                                    <ButtonBack>
                                        <Link to="/map">수정하기</Link>
                                    </ButtonBack>
                                </h5>

                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                                <Input_Contents
                                    autoComplete="boardContents"
                                    name="boardContents"
                                    placeholder="어떤 클래스를 진행할건지 상세히 적어주세요! (Ex. 프로그램 일정. 강사 약력 등등...)"
                                    type="text"
                                    onChange={changeField}/>
                            </Table_Text>
                        </td>
                    </tr>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <tr>
                        <td className="full_line" colspan="2">

                            <ButtonWidthMarginTop
                                cyan="cyan"
                                fullWidth="fullWidth"
                                type="button"
                                onClick={onClick}>
                                등록&결제
                            </ButtonWidthMarginTop>

                        </td>
                    </tr>
                </table>
            </Table_Layout>
        </Contents>
    );
};

export default withRouter(CustomerAdd);
