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

// import React, { Component } from "react";
// import CKEditor from "ckeditor4-react";
// import { Button, Form} from "react-bootstrap";
// import axios from "axios";
// import $ from "jquery";
// import {} from "jquery.cookie";
// axios.defaults.withCredentials = true;
// const headers = { withCredentials: true };

// class CustomerAdd extends Component {
//   state = {
//     data: ""
//   };

//   componentDidMount() {
//     if (this.props.location.query !== undefined) {
//       this.boardTitle.value = this.props.location.query.title;
//     }
//   }

//   componentWillMount(){
//     if (this.props.location.query !== undefined) {
//       this.setState({
//         data: this.props.location.query.content
//       });
//     }
//   }

//   writeBoard = () => {
//     let url;
//     let send_param;

//     const boardTitle = this.boardTitle.value;
//     const boardContent = this.state.data;

//     if (boardTitle === undefined || boardTitle === "") {
//       alert("글 제목을 입력 해주세요.");
//       boardTitle.focus();
//       return;
//     } else if (boardContent === undefined || boardContent === "") {
//       alert("글 내용을 입력 해주세요.");
//       boardContent.focus();
//     }
    
//     if (this.props.location.query !== undefined) {
//       url = "http://localhost:4000/api/customer";
//       send_param = {
//         headers,
//         "_id" : this.props.location.query._id,
//         "title": boardTitle,
//         "content": boardContent
//       };
//     } else {
//       url = "http://localhost:8080/board/write";
//       send_param = {
//         headers,
//         "_id" : $.cookie("login_id"),
//         "title": boardTitle,
//         "content": boardContent
//       };

//     }

//     axios
//       .post(url, send_param)
//       //정상 수행
//       .then(returnData => {
//         if (returnData.data.message) {
//           alert(returnData.data.message);
//           window.location.href = "/";
//         } else {
//           alert("글쓰기 실패");
//         }
//       })
//       //에러
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   onEditorChange = evt => {
//     this.setState({
//       data: evt.editor.getData()
//     });
//   };

//   render() {
//     const divStyle = {
//       margin: 50
//     };
//     const titleStyle = {
//       marginBottom: 5
//     };
//     const buttonStyle = {
//       marginTop: 5
//     };

//     return (
//       <div style={divStyle} className="App">
//         <h2>글쓰기</h2>
//         <Form.Control
//           type="text"
//           style={titleStyle}
//           placeholder="글 제목"
//           ref={ref => (this.boardTitle = ref)}
//         />
//         <CKEditor
//           data={this.state.data}
//           onChange={this.onEditorChange}
//         ></CKEditor>
//         <Button style={buttonStyle} onClick={this.writeBoard} block>
//           저장하기
//         </Button>
//       </div>
//     );
//   }
// }

// export default CustomerAdd;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const AuthFormBlock = styled.div`
    h3 { 
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const AuthFormBlockHeader = styled.div`
    width: 100%;
`;

const Header_Header = styled.div`
    float: left;
    width: 50%;
`;

const Header_Footer = styled.div`
    float: left;
    width: 50%;
    text-align: right;
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus: {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const StyleButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline; none;
    cursor: pointer;
    margin-top: 1rem;
    background: ${palette.gray[8]};
    &:hover {
        background: ${palette.gray[6]}
    }

    ${props => 
      props.fullWidth &&
      css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
      `
    }

    ${props => 
      props.halfWidth &&
      css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 70%;
        font-size: 1.125rem;
      `
    }

    ${props => 
        props.cyan &&
        css`
          background: #27AE60;
          &:hover {
            background: #5EC88B;
          }
        `
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const Button_Certification = styled.button`
    background-color: #ffffff;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const CustomerAdd = ({ history }) => {
    const [error, setError] = useState('');
    const [user, setUser] = useState(
        {
            boardType: '',
            boardLimit: '',
            boardTitle: '',
            boardContents: '',
        }
    );
    const changeField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };


    const onClick = e => {
        if([user.boardType, user.boardLimit, user.boardTitle, user.boardContents].includes('')) {
            setError('빈 칸을 모두 입력하세요');

            return;
        }

        if(user.boardType === '') {
            setError('등록 버튼을 한번 더 눌러주세요');

            return;
        } 

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post('/api/classopen', {
                boardType: user.boardType,
                boardLimit: user.boardLimit,
                boardTitle: user.boardTitle,
                boardContents: user.boardContents,
            },
            config
        ).then( (response) => {
            setUser({
                boardType: '',
                boardLimit: '',
                boardTitle: '',
                boardContents: '',
            })
        });

        //history.push('/');
    };

    return(
        <AuthFormBlock>
            <AuthFormBlockHeader>
                <Header_Header>
                    <h3>Class 글쓰기</h3>
                </Header_Header>
            </AuthFormBlockHeader>
            <StyledInput 
                autoComplete="boardType"
                name="boardType"
                placeholder="종류"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardLimit"
                name="boardLimit"
                placeholder="기간"
                type="text"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardTitle"
                name="boardTitle"
                placeholder="제목"
                type="text"
                onChange={ changeField }
            />
            <StyledInput 
                autoComplete="boardContents"
                name="boardContents"
                placeholder="내용"
                type="text"
                onChange={ changeField }
            />
            { error && <ErrorMessage>{ error }</ErrorMessage> }
            <StyleButton 
                cyan
                fullWidth  
                type="button"  
                onClick={ onClick }    
            >
                등록하기
            </StyleButton>
            <Footer>
                <Link to="/auth">MYPAGE</Link>
            </Footer>
        </AuthFormBlock>
    );
};

export default withRouter(CustomerAdd);