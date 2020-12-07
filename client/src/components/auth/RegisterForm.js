import React, { useEffect, useState } from 'react';
import RegisterFormBlock from './RegisterFormBlock';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {

    return(
        <RegisterFormBlock
        />
    );
};

export default withRouter(RegisterForm);