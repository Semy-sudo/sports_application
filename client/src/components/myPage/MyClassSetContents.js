import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from '../board/CustomerDelete';
import CustomerSelect from '../board/CustomerSelect';
import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Table_Row = styled.td `
    width: 100px;
    height: 100px;
    text-align: center;
`;


class MyClassSetContents extends React.Component {
    

    render() {
        return (
            <div>
                <TableCell align="left">{this.props.boardTitle}</TableCell>
                <TableCell align="right"><CustomerDelete stateRefresh={this.props.stateRefresh} boardid={this.props.boardid}/></TableCell>
                <TableCell align="right"><CustomerSelect stateRefresh={this.props.stateRefresh} boardid={this.props.boardid}/></TableCell>
            </div>
        )
    }
}



export default MyClassSetContents;