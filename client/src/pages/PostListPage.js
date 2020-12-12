import React from 'react';
import ClassTemplate from '../components/auth/ClassTemplate';
import ClassAddForm from '../components/board/ClassAddForm';


const PostListPage = ({ history, search }) => {
    return(
        <ClassTemplate>
            <ClassAddForm
                history={ history }
                search={ search }
            />
        </ClassTemplate>

    );
};  


export default PostListPage;