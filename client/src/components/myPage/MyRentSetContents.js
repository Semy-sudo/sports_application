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


class MyRentSetContents extends React.Component {
    

    render() {
        return (
            <div>
                <TableCell align="center"><h2> ☛ </h2></TableCell>
                <TableCell align="center">{this.props.CREATEDATE}</TableCell>
                <TableCell align="center">{this.props.mapdata}</TableCell>
                <TableCell align="center">{this.props.startDate}</TableCell>
                <TableCell align="center">{this.props.finishDate}</TableCell>
                <TableCell align="center">{this.props.startTime}</TableCell>
                <TableCell align="center">{this.props.finishTime}</TableCell>
            </div>
        )
    }
}



export default MyRentSetContents;