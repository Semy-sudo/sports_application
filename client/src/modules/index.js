import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import maps, { mapsSaga } from './maps';
import payment, { paymentSaga } from './payment';
import loading from './loading';

const rootReducer = combineReducers({
    auth,
    user,
    maps,
    payment,
    loading,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), mapsSaga(), paymentSaga()]);
}

export default rootReducer;