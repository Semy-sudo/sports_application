import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Customer from '../../components/board/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';

const Table_td = styled.td `
    width: 80px;
    height: 130px;
    text-align: center;
    margin-left: 10%;
    margin-right: 10%;
`;

const Line_1 = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  margin-top: 100px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

class RegularClass extends Component {

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
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }

    render() {
        return (
            <div>
                <Line_1/>
                    <h2>정규 클래스</h2>
                    <Table>
                        <Table_td>
                        <TableHead>
                            <TableRow>
                                <TableCell>이름</TableCell>
                                <TableCell>종류</TableCell>
                                <TableCell>제한인원</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>설정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.customers
                                    ? this
                                        .state
                                        .customers
                                        .map(c => {
                                            return (
                                                <Customer
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    boardid={c.boardid}
                                                    boardType={c.boardType}
                                                    boardLimit={c.boardLimit}
                                                    boardTitle={c.boardTitle}
                                                    boardContents={c.boardContents}/>
                                            );
                                        })
                                    : ""
                            }
                        </TableBody>
                        </Table_td>
                        
                    </Table>
                    <Line_1/>
            </div>
              
        )
    }

}

export default RegularClass;