import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ClassViewDetail from './ClassViewDetail';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';

const Click = styled(Button)`
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: black;
`;

class Customer extends React.Component {
    render() {
        return (
                <TableRow>
                    <TableCell>{this.props.startDate} ~ {this.props.finishDate}일 &nbsp; 
                   {this.props.startTime}시 ~ {this.props.finishTime}시 </TableCell>
                    <TableCell>{this.props.boardTitle}</TableCell>
                    <TableCell><Link to={`/postView/?boardid=${this.props.boardid}`}><Click cyan="cyan" fullWidth="fullWidth">바로가기</Click></Link></TableCell>
                </TableRow>
            
        )
    }
}



export default Customer;