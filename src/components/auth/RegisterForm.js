import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from './AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };
    const onSubmit = e => {
        e.preventDefault();
        const { id, passwd, passwdConfirm, email, name } = form;

        if([id, passwd, passwdConfirm, email, name].includes('')) {
            setError('빈 칸을 모두 입력하세요!');

            return;
        }

        if(passwd !== passwdConfirm ) {
            setError('비밀번호가 일치하지 않습니다!');
            dispatch(changeField({ form: 'register', key: 'passwd', value: '' }));
            dispatch(changeField({ form: 'register', key: 'passwdConfirm', value: '' }));
            
            return;
        }
        dispatch(register({
            id,
            passwd,
            passwdConfirm,
            email,
            name
        }));
    };

    useEffect( () => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect( () => {
        if(authError) {
            console.log("Alert Error!");
            console.log(authError);

            if(authError.response.status === 409) {
                setError("이미 존재하는 계정명입니다!");
                
                return;
            }
            setError("회원가입 실패!");

            return;
        }
        if(auth) {
            console.log("Sign Up Successfully!");
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect( () => {
        if(user) {
            console.log('CHECK API Successfully!');
            console.log(user);
        }
    }, [user]);

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
            type="register"
            form={ form }
            onChange={ onChange }
            onSubmit={ onSubmit }
            error={ error }
        />
    );
};

export default withRouter(RegisterForm);