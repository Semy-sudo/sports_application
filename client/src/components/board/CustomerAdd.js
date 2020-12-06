import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            nickName: '',
            boardType:'',
            boardLimit:'',
            boardTitle:'',
            boardContents:''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
            })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }



    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('nickName',this.state.nickName);
        formData.append('boardType',this.state.boardType);
        formData.append('boardLimit',this.state.boardLimit);
        formData.append('boardTitle',this.state.boardTitle);
        formData.append('boardContents',this.state.boardContents);
        const config = {
            headers: {
                'content=type':'multipart/form-data'
            }
            
        }
        return post(url, formData, config);
    }

    render() {
        return (
            <from onSubmit={this.handleFormSubmit}>
                <h1>클래스추가</h1>
                이름: <input type="text" name="nickName" value={this.state.nickName} onChange={this.handleValueChange}/><br/>
                종류: <input type="text" name="boardType" value={this.state.boardType} onChange={this.handleValueChange}/><br/>
                제한인원: <input type="text" name="boardLimit" value={this.state.boardLimit} onChange={this.handleValueChange}/><br/>
                제목: <input type="text" name="boardTitle" value={this.state.boardTitle} onChange={this.handleValueChange}/><br/>
                내용: <input type="text" name="boardContents" value={this.state.boardContents} onChange={this.handleValueChange}/><br/>
            </from>
        )
    }

        
}

export default CustomerAdd;