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
    LIST_MAPS_CLASS,
    LIST_MAPS_CLASS_SUCCESS,
    LIST_MAPS_CLASS_FAILURE,
] = createRequestActionTypes('maps/LIST_MAPS_CLASS');

const [
    LIST_MAPS_SPORTS,
    LIST_MAPS_SPORTS_SUCCESS,
    LIST_MAPS_SPORTS_FAILURE,
] = createRequestActionTypes('maps/LIST_MAPS_SPORTS');

export const listMaps = createAction(LIST_MAPS);
export const listMapsByClassName = createAction(
    LIST_MAPS_CLASS,
    ({ className }) => ({ className }),
);
export const listMapsBySports = createAction(
    LIST_MAPS_SPORTS,
    ({ sportsName }) => ({ sportsName }),
);

const listMapsSaga = createRequestSaga(LIST_MAPS, mapsAPI.mapList);
const listMapsClassSaga = createRequestSaga(LIST_MAPS_CLASS, mapsAPI.mapListByClass);
const listMapsSportsSaga = createRequestSaga(LIST_MAPS_SPORTS, mapsAPI.mapListBySports);

export function* mapsSaga() {
    yield takeLatest(LIST_MAPS, listMapsSaga);
    yield takeLatest(LIST_MAPS_CLASS, listMapsClassSaga);
    yield takeLatest(LIST_MAPS_SPORTS, listMapsSportsSaga);
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
        [LIST_MAPS_CLASS_SUCCESS]: (state, { payload: maps }) => ({
            ...state,
            maps,
        }),
        [LIST_MAPS_CLASS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [LIST_MAPS_SPORTS_SUCCESS]: (state, { payload: maps }) => ({
            ...state,
            maps,
        }),
        [LIST_MAPS_SPORTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState
);

export default maps;