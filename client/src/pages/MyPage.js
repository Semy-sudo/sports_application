import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ContentsBlock from '../components/myPage/ConetentsBlock';

const MyPage_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;

const MyPage = () => {
    return(
        <MyPage_Contents>
            <ContentsBlock/>
        </MyPage_Contents>
    );
};

// class Mypage extends Component {

//     componentWillMount(){
// 		this.state = {
// 			userId: ''
// 		};
// 		//adminId: cookie.load('adminId'),
// 	}

// 	onLogin(adminId){
// 		this.setState({
// 			userId:userId
// 		});
// 		//cookie.save('adminId',adminId, { path: '/'});
// 	}

// 	onLogout(){
// 		this.setState({
// 			userId:''
// 		});
// 		//cookie.remove('adminId', { path: '/'});
// 	}

// 	render(){
// 		if(!this.state.userId){
// 			return <LoginPanel 
// 					onSuccess={this.onLogin.bind(this)} 
// 					/>;
// 		}

// 		return <Hello 
// 			userId={this.state.userId}
// 			onLogout={this.onLogout.bind(this)}
// 			/>;
// 	}
// }

export default MyPage;