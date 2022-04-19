import axios from 'axios';
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
} from '../constants/profileConstants';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PROFILE_REQUEST,
        });

        const { data } = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors
                    : error.message,
        });
    }
};
