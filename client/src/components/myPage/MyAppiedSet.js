import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MyAppliedSetContents from './MyAppliedSetContents';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';

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


class MyAppliedSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentapplied: '',
            completed: 0
        }
    }

    stateRefresh = () => {
        this.setState({parentapplied: '', completed: 0});
        this
            .callApi()
            .then(res => this.setState({parentapplied: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this
            .callApi()
            .then(res => this.setState({parentapplied: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/parentapplied');
        const body = await response.json();
        return body;
    }

    render() {
        return (
            <div>
                <h2>클래스 신청 현황</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <br></br>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableCell align="center">예약일시&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;대관장소&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;대관시간</TableCell>
                        <br></br>
                        <TableRow align="center">
                    
                      
                        {
                                this.state.parentapplied
                                    ? this
                                        .state
                                        .parentapplied
                                        .map(c => {
                                            return (
                                                <MyAppliedSetContents
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    nickName={c.nickName}
                                                    boardTitle={c.boardTitle}
                                                    boardpay={c.boardpay}
                                                    startDate={c.startDate}
                                                    finishDate={c.finishDate}
                                                    startTime={c.startTime}
                                                    finishTime={c.finishTime}
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
                   
            </div>
              
        )
    }

}

export default MyAppliedSet;