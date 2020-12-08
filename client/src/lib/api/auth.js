import client from './client';

export const register = ({
    type,
    id,
    passwd,
    email,
    certifiGrade,
    certifiName,
    certifiDate
}) => client.post('http://localhost:4000/api/auth/register', {
    type,
    id,
    passwd,
    email,
    certifiGrade,
    certifiName,
    certifiDate
});