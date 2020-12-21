import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../../lib/styles/img/home-outline.svg';
import BoardIcon from '../../lib/styles/img/clipboard-outline.svg';
import MapIcon from '../../lib/styles/img/map-outline.svg';
import PersonIcon from '../../lib/styles/img/person-outline.svg';
import HomeLogo from '../../lib/styles/img/img_category/logo_sports_color.png';
import ExpertImage from '../../lib/styles/img/지도사.png';
import ParentImage from '../../lib/styles/img/학부모.png';
import '../../components/common/Icon.css';

const Header = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    z-index: 2;
`;

const Header_title = styled.div`
    float: left;
    width: 35%;
    height: 100px;
    padding-left: 80px;
    font-weight: bold;
    font-size: 35px;
    color: #27AE60;
`;

const Header_logo_Area = styled.div`
    float: left;
    padding-top: 10px;
`;

const Header_title_Area = styled.div`
    float: left;
    padding-top: 25px;
`;

const Header_Type_Area = styled.div`
    float: left;
    padding-top: 35px;
    padding-left: 20px;
`;

const Header_Type_Image = styled.img`
    width: 55px;
`;

const Header_nav = styled.div`
    float: left;
    width: 30%;
    height: 100px;
    padding-top: 10px;
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

const Header_footer = styled.div`
    float: left;
    width: 35%;
    height: 100px;
    padding-left: 100px;
    padding-top: 20px;
    font-weight: bold;
    font-size: 20px;
    color: #27AE60;
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

const ImageIcon = styled.img`
    color: #27AE60;
`;

const Logo = styled.img`
    width: 80px;
    height: 80px;
`;

const HeaderBlock = () => {
    return(
        <Header>
            <Header_title>
                <Header_logo_Area>
                    <Logo src={ HomeLogo }/>
                </Header_logo_Area>
                <Header_title_Area>
                    <Link to="/">체육동산</Link>
                </Header_title_Area>

                {/* {
                    JSON.parse(localStorage.getItem("user") !== null) &&
                    <Header_Type_Area>

                    {
                        JSON.parse(localStorage.getItem("user") !== null) &&
                        <Header_Type_Area>
                        {
                            JSON.parse(localStorage.getItem("user")).type === 'parent' ?
                            <Header_Type_Image src={ ParentImage }/> :
                            <Header_Type_Image src={ ExpertImage }/>
                        }
                        </Header_Type_Area> 
                    }

                    </Header_Type_Area> 
                } */}

            </Header_title>
            <Header_nav>
                <Header_nav_area>
                    <ul>
                        <li>
                            <Link to="/">
                                <Header_nav_icon_area>
                                    <ImageIcon src={ HomeIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    Home
                                </Header_nav_text_area>
                            </Link>
                        </li>
                        <li>
                            <Link to="/map">
                                <Header_nav_icon_area>
                                    <ImageIcon src={ MapIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    Map
                                </Header_nav_text_area>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/login">
                                <Header_nav_icon_area>
                                    <ImageIcon src={ PersonIcon } />
                                </Header_nav_icon_area>
                                <Header_nav_text_area>
                                    My
                                </Header_nav_text_area>
                            </Link>
                        </li>
                    </ul>
                </Header_nav_area>
            </Header_nav>
            <Header_footer>
                믿을 수 있는 <br/>
                우리 아이 체육 교실
            </Header_footer>
        </Header>
    );
};

export default HeaderBlock;
