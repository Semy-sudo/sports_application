import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return (
            
                <TableRow>
                    <TableCell>{this.props.nickName}</TableCell>
                    <TableCell>{this.props.boardType}</TableCell>
                    <TableCell>{this.props.boardLimit}</TableCell>
                    <TableCell>{this.props.boardTitle}</TableCell>
                    <TableCell>{this.props.boardContents}</TableCell>
                </TableRow>
            
        )
    }
}



export default Customer;