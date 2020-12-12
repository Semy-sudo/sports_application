import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ClassViewDetail from './ClassViewDetail';
import { Link } from 'react-router-dom';

class Customer extends React.Component {
    render() {
        return (
                <TableRow>
                    <TableCell>{this.props.startDate}일 {this.props.startTime}시~
                   {this.props.finishDate}일 {this.props.finishTime}시 </TableCell>
                    <TableCell>{this.props.boardTitle}</TableCell>
                    <TableCell><Link to={`/postView/?boardid=${this.props.boardid}`}>바로가기</Link></TableCell>
                </TableRow>
            
        )
    }
}



export default Customer;