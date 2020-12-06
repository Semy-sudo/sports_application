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


// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: "auto"
//     },
//     table: {
//         minWidth: 1000
//     }
// })

const PostList_Contents = styled.div`
    float: left;
    margin-top: 130px;
    width: 100%;
    height: 600px;
    background-color: #dcdcdc;
    text-align: center;
`;


class PostListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers:'',
            completed:0
        }
    }

    stateRefresh = () => {
        this.setState({
            customers:'',
            completed: 0
        });
        this.callApi()
            .then(res => this.setState({customers:res}))
            .catch(err=> console.log(err));
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
            <div>
            <PostList_Contents>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>종류</TableCell>
                            <TableCell>제한인원</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>내용</TableCell>
                            <TableCell>설정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.customers ?
                    this.state.customers.map(c=>{
                        return (
                        <Customer
                        stateRefresh = {this.stateRefresh}
                        key = {c.boardid}
                        boardid={c.boardid}
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
                <CustomerAdd stateRefresh={this.stateRefresh}/>
            </PostList_Contents>
            </div>
        )
    }
}


    



export default PostListPage;