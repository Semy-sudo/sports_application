import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import '../../components/common/table.css';
import '../../components/common/Icon.css';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import imgfile from '../../lib/styles/img/학부모.png';
import axios from "axios";
import CustomerMyPage from '../board/CustomerMyPage';

const ImageIcon = styled.img`
    color: #27AE60;
`;

const Table_Layout = styled.div`
    width: 50%;
    height: 300px;
    margin-top: 50px;
    display: inline-block;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
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
    width: 100px;
`;

const Button_Logout = styled.button`
    width: 50%;
    height: 50px;
    background-color: #27AE60;
    border: 0px solid #27AE60;
    color: white;
    font-size: 20px;
    border-radius: 10px;
`;

class ContentsBlock_Expert extends Component {

        constructor(props) {
            super(props);
            this.state = {
                customers: '',
                completed: 0
            }
        }
    
        stateRefresh = () => {
            this.setState({customers: '', completed: 0});
            this
                .callApi()
                .then(res => this.setState({customers: res}))
                .catch(err => console.log(err));
        }
    
        componentDidMount() {
            this
                .callApi()
                .then(res => this.setState({customers: res}))
                .catch(err => console.log(err));
        }
    
        callApi = async () => {
            const response = await fetch('/api/mypage');
            const body = await response.json();
            return body;
        }
    
        render() {

    return(
        <Table_Layout>
            <table>
                <tr>
                    <td className="full_line" colspan="2">
                        <Table_Text>
                            <Link to="/auth">
                            {
                                this.state.customers
                                    ? this
                                        .state
                                        .customers
                                        .map(c => {
                                            return (
                                                <CustomerMyPage
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.id}
                                                    id={c.id}
                                                />
                                            );
                                        })
                                    : ""
                            }<b>님 환영합니다!</b>
                            
                            </Link>
                        </Table_Text>
                            <Shortcut_Area>
                                <Link to="/myclass">
                                    <img src={imgfile} width='100%'/>
                                </Link>
                            </Shortcut_Area>
                    </td>
                </tr>
                <tr>
                    <td className="half_left_line">
                        <Table_Text>
                            신청클래스
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="/appliedclass">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                    <td className="half_right_line">
                        <Table_Text>
                            좋아요리스트
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="/myclass">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                </tr>
                <tr>
                    <td className="full_line" colspan="2">
                        <Table_Text>
                            결제내역
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="/auth/myPayment">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                </tr>
                <tr>
                    <td className="full_line" colspan="2">
                        <form action="/api/auth/logout" method="post">
                            <Button_Logout>
                                <Link to="/auth/login">로그아웃</Link>
                            </Button_Logout>
                        </form>
                    </td>
                </tr>
            </table>
        </Table_Layout>
    )
                }
}

export default ContentsBlock_Expert;