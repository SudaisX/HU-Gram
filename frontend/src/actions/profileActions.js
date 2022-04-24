import axios from 'axios';
import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    CREATE_UPDATE_PROFILE_REQUEST,
    CREATE_UPDATE_PROFILE_SUCCESS,
    CREATE_UPDATE_PROFILE_FAIL,
    DELETE_EXPERIENCE_REQUEST,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_FAIL,
    DELETE_EDUCATION_REQUEST,
    DELETE_EDUCATION_FAIL,
    DELETE_EDUCATION_SUCCESS,
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
                error.response && error.response.data.msg ? error.response.data.msg : error.message,
        });
    }
};

export const createUpdateProfile = (profileData) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_UPDATE_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/profile', profileData, config);

        dispatch({
            type: CREATE_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_UPDATE_PROFILE_FAIL,
            payload: error.response.data.errors,
            // payload:
            //     error.response && error.response.data.msg
            //         ? error.response.data.msg
            //         : error.message,
        });
    }
};

export const addExperience = (experienceData) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_UPDATE_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put('/api/profile/experience', experienceData, config);

        dispatch({
            type: CREATE_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_UPDATE_PROFILE_FAIL,
            payload: error.response.data.errors,
        });
    }
};

export const addEducation = (educationData) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_UPDATE_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put('/api/profile/education', educationData, config);

        dispatch({
            type: CREATE_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_UPDATE_PROFILE_FAIL,
            payload: error.response.data.errors,
        });
    }
};

export const deleteExperience = (expId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_EXPERIENCE_REQUEST,
        });

        const { data } = await axios.delete(`/api/profile/experience/${expId}`);

        dispatch({
            type: DELETE_EXPERIENCE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_EXPERIENCE_FAIL,
            payload:
                error.response && error.response.data.msg ? error.response.data.msg : error.message,
        });
    }
};

export const deleteEducation = (expId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_EDUCATION_REQUEST,
        });

        const { data } = await axios.delete(`/api/profile/education/${expId}`);

        dispatch({
            type: DELETE_EDUCATION_SUCCESS,
            payload: data,
        });

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_EDUCATION_FAIL,
            payload:
                error.response && error.response.data.msg ? error.response.data.msg : error.message,
        });
    }
};
