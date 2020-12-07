import client from './client';

export const mapList = () => client.get('/api/map/mapList');

export const map = mapId => client.get(`/api/map/${mapId}`);

export const mapListByKeyword = keyword => client.get(`http://localhost:4000/api/map/mapList/${keyword}`);