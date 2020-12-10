import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import ClassAddForm from '../components/board/ClassAddForm';


const PostListPage = () => {
    return(
        <AuthTemplate>
            <ClassAddForm/>
        </AuthTemplate>
    );
};  


export default PostListPage;