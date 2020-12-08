// import React from 'react';
// import { post } from 'axios';

// class CustomerAdd extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state= {
//             nickName: '',
//             boardType:'',
//             boardLimit:'',
//             boardTitle:'',
//             boardContents:''
//         }
//     }

//     handleFormSubmit = (e) => {
//         e.preventDefault()
//         this.addCustomer()
//             .then((response)=>{
//                 console.log("response.data",response.data);
//                 this.props.stateRefresh();
//             })
//         this.setState({
//             nickName: '',
//             boardType:'',
//             boardLimit:'',
//             boardTitle:'',
//             boardContents:''
//         })
//     }

//     handleValueChange = (e) => {
//         let nextState = {};
//         nextState[e.target.name] = e.target.value;
//         this.setState(nextState);
//     }



//     addCustomer = () => {
//         const url = '/api/customer';
//         const formData = new FormData();
//         formData.append('nickName',this.state.nickName);
//         console.log("this.state.boardid",this.state.nickName)
//         formData.append('boardType',this.state.boardType);
//         formData.append('boardLimit',this.state.boardLimit);
//         formData.append('boardTitle',this.state.boardTitle);
//         formData.append('boardContents',this.state.boardContents);
//         const config = {
//             headers: {
//                 'content-type':'multipart/form-data'
//             }
            
//         }
//         return post(url, formData, config);
    
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleFormSubmit}>
//                 <h1>클래스추가</h1>
//                 이름: <input type="text" name="nickName" value={this.state.nickName} onChange={this.handleValueChange}/><br/>
//                 종류: <input type="text" name="boardType" value={this.state.boardType} onChange={this.handleValueChange}/><br/>
//                 제한인원: <input type="text" name="boardLimit" value={this.state.boardLimit} onChange={this.handleValueChange}/><br/>
//                 제목: <input type="text" name="boardTitle" value={this.state.boardTitle} onChange={this.handleValueChange}/><br/>
//                 내용: <input type="text" name="boardContents" value={this.state.boardContents} onChange={this.handleValueChange}/><br/>
//                 <button type="submit">추가하기</button>
//             </form>
//         )
//     }

        
// }

import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class CustomerAdd extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.boardTitle.value = this.props.location.query.title;
    }
  }

  componentWillMount(){
    if (this.props.location.query !== undefined) {
      this.setState({
        data: this.props.location.query.content
      });
    }
  }

  writeBoard = () => {
    let url;
    let send_param;

    const boardTitle = this.boardTitle.value;
    const boardContent = this.state.data;

    if (boardTitle === undefined || boardTitle === "") {
      alert("글 제목을 입력 해주세요.");
      boardTitle.focus();
      return;
    } else if (boardContent === undefined || boardContent === "") {
      alert("글 내용을 입력 해주세요.");
      boardContent.focus();
    }
    
    if (this.props.location.query !== undefined) {
      url = "http://localhost:4000/api/customer";
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        "title": boardTitle,
        "content": boardContent
      };
    } else {
      url = "http://localhost:8080/api/customer";
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),
        "title": boardTitle,
        "content": boardContent
      };

    }

    axios
      .post(url, send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.href = "/";
        } else {
          alert("글쓰기 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  onEditorChange = evt => {
    this.setState({
      data: evt.editor.getData()
    });
  };

  render() {
    const divStyle = {
      margin: 50
    };
    const titleStyle = {
      marginBottom: 5
    };
    const buttonStyle = {
      marginTop: 5
    };

    return (
      <div style={divStyle} className="App">
        <h2>글쓰기</h2>
        <Form.Control
          type="text"
          style={titleStyle}
          placeholder="글 제목"
          ref={ref => (this.boardTitle = ref)}
        />
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange}
        ></CKEditor>
        <Button style={buttonStyle} onClick={this.writeBoard} block>
          저장하기
        </Button>
      </div>
    );
  }
}

export default CustomerAdd;