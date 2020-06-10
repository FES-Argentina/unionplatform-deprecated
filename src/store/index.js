import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import SecureStorage from 'react-native-secure-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import documentsReducer from '../reducers/documents';
import userReducer from '../reducers/user';
import newsReducer from '../reducers/news';
import alertsReducer from '../reducers/alerts';
import informationReducer from '../reducers/information';
import errorReducer from '../reducers/errors';
import uiReducer from '../reducers/ui';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  documents: documentsReducer,
  user: userReducer,
  error: errorReducer,
  news: newsReducer,
  alerts: alertsReducer,
  ui: uiReducer,
  information: informationReducer
});

const persistConfig = {
  key: 'root',
  storage: SecureStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
