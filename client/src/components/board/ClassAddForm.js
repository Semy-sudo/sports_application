import React, { useEffect, useState } from 'react';
import CustomerAdd from './CustomerAdd';
import { withRouter } from 'react-router-dom';

const ClassAddForm = ({ history }) => {

    return(
        <CustomerAdd
        />
    );
};

export default withRouter(ClassAddForm);