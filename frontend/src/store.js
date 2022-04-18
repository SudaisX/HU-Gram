import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { loadUserReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    loadedUser: loadUserReducer,
});

const tokenFromStorage = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = { userLogin: { token: tokenFromStorage } };

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
