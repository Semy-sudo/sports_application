import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            boardid: '',
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
                console.log("response.data",response.data);
                this.props.stateRefresh();
            })
        this.setState({
            boardid: '',
            boardType:'',
            boardLimit:'',
            boardTitle:'',
            boardContents:''
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
        formData.append('boardid',this.state.boardid);
        console.log("this.state.boardid",this.state.boardid)
        formData.append('boardType',this.state.boardType);
        formData.append('boardLimit',this.state.boardLimit);
        formData.append('boardTitle',this.state.boardTitle);
        formData.append('boardContents',this.state.boardContents);
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
            
        }
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>클래스추가</h1>
                번호: <input type="text" name="boardid" value={this.state.boardid} onChange={this.handleValueChange}/><br/>
                종류: <input type="text" name="boardType" value={this.state.boardType} onChange={this.handleValueChange}/><br/>
                제한인원: <input type="text" name="boardLimit" value={this.state.boardLimit} onChange={this.handleValueChange}/><br/>
                제목: <input type="text" name="boardTitle" value={this.state.boardTitle} onChange={this.handleValueChange}/><br/>
                내용: <input type="text" name="boardContents" value={this.state.boardContents} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }

        
}

export default CustomerAdd;