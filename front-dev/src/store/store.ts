import { createStore } from 'redux';
import { tokenReducer } from './tokens/tokenReducer';

export const store = createStore(tokenReducer);