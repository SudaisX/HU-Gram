import {
    ADD_POST_FAIL,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    CLEAR_POSTS,
    DELETE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POST_FAIL,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
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

export const getPostReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POST_REQUEST:
            return { loading: true };

        case GET_POST_SUCCESS:
            return { loading: false, post: action.payload };

        case GET_POST_FAIL:
            return { loading: false, error: action.payload };

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

export const deletePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return { loading: true };

        case DELETE_POST_SUCCESS:
            return { loading: false, payload: action.payload };

        case DELETE_POST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return { loading: true };

        case ADD_POST_SUCCESS:
            return { loading: false, payload: action.payload };

        case ADD_POST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
