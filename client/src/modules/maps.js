import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as mapsAPI from '../lib/api/maps';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_MAPS,
    LIST_MAPS_SUCCESS,
    LIST_MAPS_FAILURE,
] = createRequestActionTypes('maps/LIST_MAPS');

const [
    LIST_MAPS_KEYWORD,
    LIST_MAPS_KEYWORD_SUCCESS,
    LIST_MAPS_KEYWORD_FAILURE,
] = createRequestActionTypes('maps/LIST_MAPS_KEYWORD');

export const listMaps = createAction(LIST_MAPS);
export const listMapsByKeyword = createAction(
    LIST_MAPS_KEYWORD,
    keyword => keyword
);

const listMapsSaga = createRequestSaga(LIST_MAPS, mapsAPI.mapList);
const listMapsKeywordSaga = createRequestSaga(LIST_MAPS_KEYWORD, mapsAPI.mapListByKeyword);

export function* mapsSaga() {
    yield takeLatest(LIST_MAPS, listMapsSaga);
    yield takeLatest(LIST_MAPS_KEYWORD, listMapsKeywordSaga);
}

const initialState = {
    maps: null,
    error: null,
};

const maps = handleActions(
    {
        [LIST_MAPS_SUCCESS]: (state, { payload: maps }) => ({
            ...state,
            maps,
        }),
        [LIST_MAPS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [LIST_MAPS_KEYWORD_SUCCESS]: (state, { payload: maps }) => ({
            ...state,
            maps,
        }),
        [LIST_MAPS_KEYWORD_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState
);

export default maps;