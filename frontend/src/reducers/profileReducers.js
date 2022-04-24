import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UNLOAD_PROFILE,
    CREATE_UPDATE_PROFILE_REQUEST,
    CREATE_UPDATE_PROFILE_SUCCESS,
    CREATE_UPDATE_PROFILE_FAIL,
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
