import client from './client';

export const mapList = () => client.get('/api/map/mapList');

export const map = () => client.get('/api/map/');

// 게시글 이름으로 className => ? 변경
export const mapListByClass = className => client.get(`/api/map/mapList/${className}`);

// 게시글 이름으로 sportsName => ? 변경
export const mapListBySports = sportsName => client.get(`/api/map/mapList/${sportsName}`);