import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MyClassSetContents from './MyClassSetContents';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import InfiniteScroll from "../../InfiniteScroll";

const Table_td = styled.td `
    width: 200px;
    height: 100px;
    text-align: right;
    margin-top:-20px;
`;

const Button_Back = styled.button`
    width: 20%;
    height: 50px;
    background-color: #27AE60;
    border: 0px solid #27AE60;
    color: white;
    font-size: 20px;
    border-radius: 10px;
`;


class MyClassSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myclass: '',
            completed: 0
        }
    }

    stateRefresh = () => {
        this.setState({myclass: '', completed: 0});
        this
            .callApi()
            .then(res => this.setState({myclass: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this
            .callApi()
            .then(res => this.setState({myclass: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/myclass');
        const body = await response.json();
        return body;
    }

    render() {
        return (
            <div>
                 <InfiniteScroll height={500}>
                <h2>현재 나의 등록 클래스 현황</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <br></br>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        
                        <br></br>
                        <TableRow align="center">
                    
                      
                        {
                                this.state.myclass
                                    ? this
                                        .state
                                        .myclass
                                        .map(c => {
                                            return (
                                                <MyClassSetContents
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    boardTitle={c.boardTitle}
                                                    boardpay={c.boardpay}
                                                    boardContents={c.boardContents}
                                                    />
                                            );
                                        })
                                    : ""
                        }
                        
                        </TableRow>
                        </TableBody>
                        <br></br><br></br>
                        <Button_Back>
                                <Link to="/auth">뒤로가기</Link>
                        </Button_Back>
                    </Table>
                    </InfiniteScroll>
            </div>
              
        )
    }

}

export default MyClassSet;