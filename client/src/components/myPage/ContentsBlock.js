import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import '../../components/common/table.css';
import '../../components/common/Icon.css';
import ShortCut from '../../lib/styles/img/chevron-forward-outline.svg';
import ExpertIcon from '../../lib/styles/img/지도사.png';
import axios from "axios";
import ContentsBlock_Expert from './ContentsBlock_Expert';
import ContentsBlock_Parent from './ContentsBlock_Parent';

const ImageIcon = styled.img`
    color: #27AE60;
`;

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

class ContentsBlock extends Component {

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
            const response = await fetch('/api/contentsblock');
            const body = await response.json();
            return body;
        }
    
        render() {
            
    return(
        <div>
            
        {
            // this.state.customers
            //     ? (this
            //         .state
            //         .customers
            //         .map(c => {
            //             return (
            //                 <ContentsBlock_Expert/>
            //             );
            //         }))
            //     : 
                <ContentsBlock_Parent/>
        }
        
        </div>
        
    )
    
                }
}

export default ContentsBlock;