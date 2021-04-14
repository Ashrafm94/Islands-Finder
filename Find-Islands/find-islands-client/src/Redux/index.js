import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import boardReducer from './reducers/boardReducer';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['boardReducer']
}

const rootReducer = combineReducers({
    boardReducer
});

const persistenedReducer = persistReducer(persistConfig, rootReducer);

// const configureStore = () => createStore(rootReducer);
// export default configureStore;

const store = createStore(persistenedReducer);
const persistor = persistStore(store);

// eslint-disable-next-line
export default {store, persistor};
