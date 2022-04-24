import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadUserReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import {
    getProfileReducer,
    createUpdateProfileReducer,
    deleteEducationReducer,
    deleteExperienceReducer,
    getProfilesReducer,
    getProfileByIdReducer,
} from './reducers/profileReducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    loadedUser: loadUserReducer,
    userProfile: getProfileReducer,
    allProfiles: getProfilesReducer,
    profileById: getProfileByIdReducer,
    profileUpdate: createUpdateProfileReducer,
    deleteEducation: deleteEducationReducer,
    deleteExperience: deleteExperienceReducer,
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
