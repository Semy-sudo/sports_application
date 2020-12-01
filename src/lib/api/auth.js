import client from './client';

export const login = ({ id, passwd }) => client.post('/api/auth/login', { id, passwd });

export const register = ({ id, passwd, email, name }) => client.post('/api/auth/register', { id, passwd, email, name });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');