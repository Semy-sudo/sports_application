import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MyClassSetContents from './MyClassSetContents';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';

const Table_td = styled.td `
    width: 100px;
    height: 100px;
    text-align: center;
`;

class MyClassSet extends Component {

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
        const response = await fetch('/api/myclass');
        const body = await response.json();
        return body;
    }

    render() {
        return (
            <div>
                <h2>현재 나의 클래스</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Table_td>
                            {
                                this.state.customers
                                    ? this
                                        .state
                                        .customers
                                        .map(c => {
                                            return (
                                                <MyClassSetContents
                                                    stateRefresh={this.stateRefresh}
                                                    key={c.boardid}
                                                    boardTitle={c.boardTitle}/>
                                            );
                                        })
                                    : ""
                            }
                            </Table_td>
                        </TableBody>
                    </Table>
                   
            </div>
              
        )
    }

}

export default MyClassSet;