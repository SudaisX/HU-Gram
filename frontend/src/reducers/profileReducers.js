import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UNLOAD_PROFILE,
    CREATE_UPDATE_PROFILE_REQUEST,
    CREATE_UPDATE_PROFILE_SUCCESS,
    CREATE_UPDATE_PROFILE_FAIL,
    DELETE_EDUCATION_REQUEST,
    DELETE_EDUCATION_SUCCESS,
    DELETE_EDUCATION_FAIL,
    DELETE_EXPERIENCE_REQUEST,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_FAIL,
    GET_PROFILES_REQUEST,
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAIL,
    GET_PROFILE_BY_ID_REQUEST,
    GET_PROFILE_BY_ID_SUCCESS,
    GET_PROFILE_BY_ID_FAIL,
    GET_PROFILE_BY_ID_CLEAR,
} from '../constants/profileConstants';

export const getProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return { loading: true };

        case GET_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload };

        case GET_PROFILE_FAIL:
            return { loading: false, error: action.payload };

        case UNLOAD_PROFILE:
            return {};

        default:
            return state;
    }
};

export const getProfilesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILES_REQUEST:
            return { loading: true };

        case GET_PROFILES_SUCCESS:
            return { loading: false, profiles: action.payload };

        case GET_PROFILES_FAIL:
            return { loading: false, error: action.payload };

        case GET_PROFILE_BY_ID_CLEAR:
            return {};

        default:
            return state;
    }
};

export const getProfileByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROFILE_BY_ID_REQUEST:
            return { loading: true };

        case GET_PROFILE_BY_ID_SUCCESS:
            return { loading: false, profile: action.payload };

        case GET_PROFILE_BY_ID_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const createUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_UPDATE_PROFILE_REQUEST:
            return { loading: true };

        case CREATE_UPDATE_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload, success: true };

        case CREATE_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const deleteExperienceReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EXPERIENCE_REQUEST:
            return { loading: true };

        case DELETE_EXPERIENCE_SUCCESS:
            return { loading: false, profile: action.payload, success: true };

        case DELETE_EXPERIENCE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const deleteEducationReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EDUCATION_REQUEST:
            return { loading: true };

        case DELETE_EDUCATION_SUCCESS:
            return { loading: false, profile: action.payload, success: true };

        case DELETE_EDUCATION_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
