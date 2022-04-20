import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UNLOAD_PROFILE,
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
