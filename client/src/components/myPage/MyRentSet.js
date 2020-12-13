import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MyRentSetContents from './MyRentSetContents';
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


class MyRentSet extends Component {

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
                <h2>현재 대관 현황</h2>
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
                                this.state.myclass
                                    ? this
                                        .state
                                        .myclass
                                        .map(c => {
                                            return (
                                                <MyRentSetContents
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    CREATEDATE={c.CREATEDATE}
                                                    mapdata={c.mapdata}
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

export default MyRentSet;