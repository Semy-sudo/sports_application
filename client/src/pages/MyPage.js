import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ContentsBlock from '../components/myPage/ContentsBlock';
//import ContentsBlock_NoLogin from '../components/myPage/ContentsBlock_NoLogin';

const MyPage_Contents = styled.div`
    float: left;
    margin-top: 100px;
    width: 100%;
    height: 100%;
    background-color: #dcdcdc;
    text-align: center;
`;


class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            completed: 0
        }
    }

    stateRefresh = () => {
        this.setState({user: '', completed: 0});
        this
            .callApi()
            .then(res => this.setState({user: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this
            .callApi()
            .then(res => this.setState({user: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/mypage');
        const body = await response.json();

        // localStorage.setItem("user", JSON.stringify(body[0]));

        return body;
    }

    render() {

    return(
        <MyPage_Contents>
            {
                this.state.user
                ? this
                    .state
                    .user
                    .map(c => {
                        return (
                            <ContentsBlock/>
                        );
                    })
                :""
            }
        </MyPage_Contents>
    );
    }
};


export default MyPage;