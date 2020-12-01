import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };
    const onSubmit = e => {
        e.preventDefault();

        const { id, passwd } = form;
        dispatch(login({ id, passwd }));
    };

    useEffect( () => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect( () => {
        if(authError) {
            console.log("Alert Error!");
            console.log(authError);
            setError('Login Fail!');

            return;
        }
        if(auth) {
            console.log("Login Successfully!");
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect( () => {
        if(user) {
            history.push('/');

            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e) {
                console.log('localstorage is not working');
            }
        }
    }, [history, user]);

    return(
        <AuthForm
            type="login"
            form={ form }
            onChange={ onChange }
            onSubmit={ onSubmit }
            error={ error }
        />
    );
};

export default withRouter(LoginForm);