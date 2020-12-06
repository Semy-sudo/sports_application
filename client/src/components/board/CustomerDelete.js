import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(boardid) {
        const url = '/api/customers/'+boardid;
        fetch(url,{
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick={(e)=> {this.deleteCustomer(this.props.boardid)}}>삭제</button>
        )
    }
}

export default CustomerDelete;