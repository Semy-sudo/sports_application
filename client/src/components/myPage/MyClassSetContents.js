import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from '../board/CustomerDelete';
import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const Table_Row = styled.td `
    width: 100px;
    height: 100px;
    text-align: center;
`;


class MyClassSetContents extends React.Component {
    

    render() {
        
        return (
            <TableContainer component={Paper}>
                <TableRow>
                    <TableCell>{this.props.boardTitle}</TableCell>
                    <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} boardid={this.props.boardid}/></TableCell>
                </TableRow>
            </TableContainer>
        )
    }
}



export default MyClassSetContents;