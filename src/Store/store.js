import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import boardsReducer from './Reducers/boards.reducer';

//combining all the reducer and making one root reducer to be used in redux store
const rootReducer = combineReducers({ board: boardsReducer });

//using redux dev tools (middleware composer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creating store with enhanced middlewares(devTools & thunk)
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export default store;
