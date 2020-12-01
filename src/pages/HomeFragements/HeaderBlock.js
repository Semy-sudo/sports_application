import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../../lib/styles/img/home-outline.svg';
import BoardIcon from '../../lib/styles/img/clipboard-outline.svg';
import MapIcon from '../../lib/styles/img/map-outline.svg';
import PersonIcon from '../../lib/styles/img/person-outline.svg';
import '../../components/common/Icon.css';

const Header = styled.div`
    width: 100%;
    height: 130px;
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

const Header_title = styled.div`
    float: left;
    width: 100%;
    height: 50px;
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    color: #000080;
`;

const Header_nav = styled.div`
    float: left;
    width: 100%;
    height: 80px;
    text-align: center;
    ul {
        float: left;
        list-style: none;
        margin: 0 auto;
        padding: 0;
        li {
            float: left;
            width: 50px;
            height: 80px;
            text-align: center;
            margin-left: 15px;
            margin-right: 15px;
            a {
                color: #000000;
            }
        }
    }
`;

const Header_nav_icon_area = styled.div`
    width: 50px;
    height: 40px;
`;

const Header_nav_text_area = styled.div`
    font-size: 15px;
`;

const Header_nav_area = styled.div`
    display: inline-block;
    margin-top: 15px;
`;

const HeaderBlock = () => {
    return(
        <Header>
            <Header_title>
                <Link to="/">Sports Application</Link>
            </Header_title>
            <Header_nav>
                <Header_nav_area>
                    <ul>
                        <li>
                            <Link to="/">
                                <Header_nav_icon_area>
                                    <img src={ HomeIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    Home
                                </Header_nav_text_area>
                            </Link>
                        </li>
                        <li>
                            <Link to="/post">
                                <Header_nav_icon_area>
                                    <img src={ BoardIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    Board
                                </Header_nav_text_area>
                            </Link>
                        </li>
                        <li>
                            <Link to="/map">
                                <Header_nav_icon_area>
                                    <img src={ MapIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    Map
                                </Header_nav_text_area>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth">
                                <Header_nav_icon_area>
                                    <img src={ PersonIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    My
                                </Header_nav_text_area>
                            </Link>
                        </li>
                    </ul>
                </Header_nav_area>
            </Header_nav>
        </Header>
    );
};

export default HeaderBlock;