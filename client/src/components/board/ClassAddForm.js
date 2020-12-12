import React, { useEffect, useState } from 'react';
import CustomerAdd from './CustomerAdd';
import { withRouter } from 'react-router-dom';

const ClassAddForm = ({ history, search }) => {

    return(
        <CustomerAdd
            history={ history }
            search={ search }
        />
    );
};

export default withRouter(ClassAddForm);