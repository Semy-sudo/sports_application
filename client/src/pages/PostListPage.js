// import React from 'react';
// import Button from '../components/common/Button';

// const PostListPage = () => {
//     return(
//         <div>
//              <Button>버튼</Button> 
//         </div>
//     );
// };

// export default PostListPage;

import React, { Component } from 'react';
import styled from 'styled-components';
import Customer from '../components/board/Customer';
import CustomerAdd from '../components/board/CustomerAdd';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 1000
    }
})

const PostList_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;


class PostListPage extends Component {

    state = {
        customers:""
    }

    componentDidMount() {
        this.callApi()
        .then(res => this.setState({customers:res}))
        .catch(err=> console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }

    render() {
        return(
            <PostList_Contents>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>종류</TableCell>
                            <TableCell>제한인원</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>내용</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.customers ?
                    this.state.customers.map(c=>{
                        return (
                        <Customer
                        nickName={c.nickName}
                        boardType={c.boardType}
                        boardLimit={c.boardLimit}
                        boardTitle={c.boardTitle}
                        boardContents={c.boardContents}
                        />     
                        );
                    })
                    : ""}
                    </TableBody>
                </Table>
                <CustomerAdd/>
            </div>
            </PostList_Contents>
        )
    }
}


    



export default PostListPage;