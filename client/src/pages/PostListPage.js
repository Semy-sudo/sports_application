import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import ClassAddForm from '../components/board/ClassAddForm';


const PostListPage = ({ history, search }) => {
    return(
        <AuthTemplate>
            <ClassAddForm
                history={ history }
                search={ search }
            />
        </AuthTemplate>
    );
};  


export default PostListPage;