import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [ReduxThunk];
const composeEnhancers =
  //  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;
const store = createStore(
  rootReducer,
  {}, // default state of the application
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
