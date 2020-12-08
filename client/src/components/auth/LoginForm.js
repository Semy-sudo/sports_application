import React from 'react';
import LoginFormBlock from '../../components/auth/LoginFormBlock';
import { withRouter } from 'react-router-dom';

const LoginForm = ({ history }) => {

    return(
        <LoginFormBlock />
    );
};

export default withRouter(LoginForm);