import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/common/table.css';
import '../../components/common/Icon.css';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import { logout } from '../../modules/user';

const Table_Layout = styled.div`
    width: 50%;
    height: 500px;
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
`;

const Button_Logout = styled.button`
    width: 50%;
    height: 50px;
    background-color: ${palette.cyan[4]};
    border: 0px solid ${palette.cyan[4]};
    color: white;
    font-size: 20px;
    border-radius: 10px;
`;

const ContentsBlock = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    return(
        <Table_Layout>
            <table>
                <tr>
                    <td className="full_line" colspan="2">
                        {
                            user ? 
                            <Table_Text>
                                { user.id } 님 환영합니다! 
                            </Table_Text>
                             : 
                            <Table_Text>
                                <Link to="/auth/login">
                                    로그인 및 회원가입 하기
                                </Link>
                            </Table_Text>
                        }
                    </td>
                </tr>
                <tr>
                    <td className="half_left_line">
                        <Table_Text>
                            내 포인트
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="#">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                    <td className="half_right_line">
                        <Table_Text>
                            내 게시글
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="#">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                </tr>
                <tr>
                    <td className="half_left_line">
                        <Table_Text>
                            찜 리스트
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="#">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                    <td class="half_right_line">
                        <Table_Text>
                            쪽지함
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="#">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                </tr>
                <tr>
                    <td className="full_line" colspan="2">
                        <Table_Text>
                            대관 내역
                        </Table_Text>
                        <Shortcut_Area>
                            <Link to="#">
                                <img src={ ShortCut }/>
                            </Link>
                        </Shortcut_Area>
                    </td>
                </tr>
                {/* {
                    user &&
                    <tr>
                        <td className="full_line" colspan="2">
                            <Button_Logout/>
                        </td>
                    </tr>
                } */}
                {
                    user &&
                    <tr>
                        <td className="full_line" colspan="2">
                            <Button_Logout onClick={ onLogout }>
                                Logout
                            </Button_Logout>
                        </td>
                    </tr>
                }
            </table>
        </Table_Layout>
    );
};

export default ContentsBlock;