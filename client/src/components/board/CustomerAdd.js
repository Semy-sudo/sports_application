import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../common/Button';
import { post } from 'axios';

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

const AuthFormBlock = styled.div`
    margin-top: 0px;
`;

const Contents_Title = styled.div`
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

const Contents_Title_Line = styled.div`
    top: 135px;
    left: 333px;
    width: 800px;
    height: 3px;
    background-color: rgb(39, 174, 96);
`;

const Contents_Detail_Text = styled.div`
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

const Table_Layout = styled.div`
    width: 100%;
    margin-top: 50px;
`;

const Table_Text = styled.div`
    float: left;
    margin-left: 20px;
    line-height: 100px;
    font-size: 20px;
`;



const Shortcut_Area = styled.span`
    float: right;
    margin-top: 25px;
`;

const Input_Title = styled.input`
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

const Input_Detail = styled.input`
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

const Input_Contents = styled.input`
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


const Input_Detail_Block = styled.input`
    background-color: rgb(224, 224, 224);
    text-align: center;
    padding: 181*24;
`;

class CustomerAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            boardTitle:''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }
    
    handleFormSubmit(e) {

        e.preventDefault()
        
        this.addCustomer()
        
        .then((response) => {
        
        console.log(response.data);
        
        })
        
    }

    handleValueChange(e) {

        let nextState = {};
        
        nextState[e.target.name] = e.target.value;
        
        this.setState(nextState);
        
    }






    addCustomer(){
        const url = '/api/classopen';
        const formData = new FormData();
        formData.append('boardTitle',this.state.boardTitle);
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config)
    }
    
    render(){

        return(
            <Contents>
            <Table_Layout>
            <Table_Text>
                <Contents_Title>클래스 등록하기</Contents_Title><Contents_Title_Line></Contents_Title_Line>
            </Table_Text>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                            <input type="checkbox"/>원데이 클래스 <input type="checkbox"/> 정규 클래스 
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
                            value={this.state.boardTitle}
                            onChange={this.handleValueChange}
                            />
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="half_left_line">
                        <div data-image-content="true"></div>
                        </td>
                        <td className="half_right_line">
                            <tr>
                                <Table_Text>
                                <Contents_Detail_Text>수강료:</Contents_Detail_Text>
                                </Table_Text>
                                <Shortcut_Area>
                                <Input_Detail 
                                autoComplete="baordpay"
                                name="boardpay"
                                placeholder="원"
                                type="text"
                                />
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
                                />
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
                                />
                                </Shortcut_Area>
                            </tr>
                             
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                            <Table_Text>
                                
                                    날짜 시간(지도에서 입력받아 온것)
                                
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
                            />
                            </Table_Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="full_line" colspan="2">
                           
                        
                            <ButtonWidthMarginTop cyan="cyan" fullWidth="fullWidth">
                                <button type="submit">등록&결제</button>
                            </ButtonWidthMarginTop>
                        
                           
                        </td>
                    </tr>
                </table>
                </form>
            </Table_Layout>
            </Contents>
        );
    };

}


export default CustomerAdd;