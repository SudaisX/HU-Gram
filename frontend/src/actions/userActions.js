import axios from 'axios';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
} from '../constants/userConstants';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        dispatch({
            type: LOAD_USER_REQUEST,
        });

        const { data } = await axios.get('/api/users/me');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {
            data: { token },
        } = await axios.post('/api/users/login', { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: token,
        });

        localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.message,
        });
    }
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {
            data: { token },
        } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: token,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: token,
        });

        localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: USER_LOGOUT });
};
