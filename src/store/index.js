import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import documentsReducer from '../reducers/documents';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  documents: documentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
