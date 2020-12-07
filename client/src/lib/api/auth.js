import client from './client';

export const login = ({ id, passwd }) => client.post('http://localhost:4000/api/auth/login', { id, passwd });

export const register = ({ type, id, passwd, email, addressBasic, addressDetail, certifiNumber }) => 
    client.post('http://localhost:4000/api/auth/register', { type, id, passwd, email, addressBasic, addressDetail, certifiNumber });

export const check = () => client.get('http://localhost:4000/api/auth/check');

export const logout = () => client.post('http://localhost:4000/api/auth/logout');