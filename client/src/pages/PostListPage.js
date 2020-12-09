import React, { Component } from 'react';
import styled from 'styled-components';
import CustomerAdd from '../components/board/CustomerAdd';



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


// class PostListPage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             customers:'',
//             completed:0
//         }
//     }

//     stateRefresh = () => {
//         this.setState({
//             customers:'',
//             completed: 0
//         });
//         this.callApi()
//             .then(res => this.setState({customers:res}))
//             .catch(err=> console.log(err));
//     }

//     componentDidMount() {
//         this.callApi()
//         .then(res => this.setState({customers:res}))
//         .catch(err=> console.log(err));
//     }

//     callApi = async () => {
//         const response = await fetch('/api/ClassOpen');
//         const body = await response.json();
//         return body;
//     }

//     render() {
//         return(
//             <div>
//             <PostList_Contents>
//                 <CustomerAdd stateRefresh={this.stateRefresh}/>
//             </PostList_Contents>
//             </div>
//         )
//     }
// }


const PostListPage = () => {
    return(
        <PostList_Contents>
            <CustomerAdd/>
        </PostList_Contents>
    );
};  


export default PostListPage;