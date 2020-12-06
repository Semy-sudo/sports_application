import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
    render() {
        return (
            
                <TableRow>
                    <TableCell>{this.props.boardid}</TableCell>
                    <TableCell>{this.props.boardType}</TableCell>
                    <TableCell>{this.props.boardLimit}</TableCell>
                    <TableCell>{this.props.boardTitle}</TableCell>
                    <TableCell>{this.props.boardContents}</TableCell>
                    <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} boardid={this.props.boardid}/></TableCell>
                </TableRow>
            
        )
    }
}



export default Customer;