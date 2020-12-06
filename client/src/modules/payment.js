import { createAction, handleActions } from  'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as paymentAPI from '../lib/api/payment';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'payment/INITIALIZE';
const [
    PAYMENT_CLASS,
    PAYMENT_CLASS_SUCCESS,
    PAYMENT_CLASS_FAILURE,
] = createRequestActionTypes('payment/PAYMENT_CLASS');

export const initialize = createAction(INITIALIZE);
export const paymentClass = createAction(
    PAYMENT_CLASS,
    // ({}) => ({}), // 결제 관련 변수 추가
);

const paymentClassSaga = createRequestSaga(PAYMENT_CLASS, paymentAPI.paymentClass);
export function* paymentSaga() {
    yield takeLatest(PAYMENT_CLASS, paymentClassSaga);
}

const initialState = {
    // 결제 관련 변수 추가
    payment: null,
    paymentError: null,
};

const payment = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [PAYMENT_CLASS]: state => ({
            ...state,
            payment: null,
            paymentError: null,
        }),
        [PAYMENT_CLASS_SUCCESS]: (state, { payload: payment }) => ({
            ...state,
            payment,
        }),
        [PAYMENT_CLASS_FAILURE]: (state, { payload: paymentError }) => ({
            ...state,
            paymentError,
        }),
    },
    initialState,
);

export default payment;