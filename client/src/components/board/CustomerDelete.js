import React from 'react';
import styled from 'styled-components';

const Table_td = styled.td `
    width: 100px;
    height: 50px;
    text-align: right;
    margin-left: 10%;
    margin-right: 20%;
`;

class CustomerDelete extends React.Component {

    deleteCustomer(boardid) {
        const url = '/api/myclass/'+ boardid;
        fetch(url,{
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <Table_td>
            <button onClick={(e)=> {this.deleteCustomer(this.props.boardid)}}>취소하기</button>
            </Table_td>
        )
    }
}

export default CustomerDelete;