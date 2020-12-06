import client from './client';

export const mapList = () => client.get('/api/map/mapList');

export const map = () => client.get('/api/map/');

export const mapListByKeyword = keyword => client.get(`/api/map/mapList/${keyword}`);