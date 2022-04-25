import {
    CLEAR_POSTS,
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    UPDATE_LIKES_FAIL,
    UPDATE_LIKES_REQUEST,
    UPDATE_LIKES_SUCCESS,
} from '../constants/postConstants';

export const getPostsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return { loading: true };

        case GET_POSTS_SUCCESS:
            return { loading: false, posts: action.payload };

        case GET_POSTS_FAIL:
            return { loading: false, error: action.payload };

        case CLEAR_POSTS:
            return {};

        default:
            return state;
    }
};

export const likesReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_LIKES_REQUEST:
            return { loading: true };

        case UPDATE_LIKES_SUCCESS:
            return { loading: false, likes: action.payload };

        case UPDATE_LIKES_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
