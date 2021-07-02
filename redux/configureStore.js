import { combineReducers, createStore } from 'redux';
import accountPrefReducer from './ducks/accountPref';

const reducer = combineReducers({
  accountPrefs: accountPrefReducer,
});

const store = createStore(reducer);

export default store;