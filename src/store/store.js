// store.js

import { createStore } from 'redux';
import mainReducer from './reducers/mainReducer.js';

const store = createStore(mainReducer);

export default store;