import reducers from './reducers';
import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}