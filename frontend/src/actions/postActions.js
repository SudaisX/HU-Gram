import axios from 'axios';
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAIL,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POST_FAIL,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    REMOVE_COMMENT_FAIL,
    REMOVE_COMMENT_REQUEST,
    REMOVE_COMMENT_SUCCESS,
    UPDATE_LIKES_FAIL,
    UPDATE_LIKES_REQUEST,
    UPDATE_LIKES_SUCCESS,
} from '../constants/postConstants';

export const getAllPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_POSTS_REQUEST,
        });

        const { data } = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const getPostById = (postId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_POST_REQUEST,
        });

        const { data } = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type: GET_POST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_POST_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addLike = (postId) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_LIKES_REQUEST,
        });

        const { data } = await axios.put(`/api/posts/${postId}/like`);

        dispatch({
            type: UPDATE_LIKES_SUCCESS,
            payload: { postId, likes: data },
        });
        dispatch(getAllPosts());
    } catch (error) {
        dispatch({
            type: UPDATE_LIKES_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const removeLike = (postId) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_LIKES_REQUEST,
        });

        const { data } = await axios.put(`/api/posts/${postId}/unlike`);

        dispatch({
            type: UPDATE_LIKES_SUCCESS,
            payload: { postId, likes: data },
        });

        dispatch(getAllPosts());
    } catch (error) {
        dispatch({
            type: UPDATE_LIKES_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deletePost = (postId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_POST_REQUEST,
        });

        const { data } = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data,
        });
        dispatch(getAllPosts());
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const createPost = (postData) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_POST_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/posts`, postData, config);

        dispatch({
            type: ADD_POST_SUCCESS,
            payload: data,
        });
        dispatch(getAllPosts());
    } catch (error) {
        dispatch({
            type: ADD_POST_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addComment = (postId, comment) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_COMMENT_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/posts/${postId}/comment`, comment, config);

        dispatch({
            type: ADD_COMMENT_SUCCESS,
            payload: data,
        });

        dispatch(getPostById(postId));
    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_COMMENT_REQUEST,
        });

        const { data } = await axios.delete(`/api/posts/${postId}/comment/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT_SUCCESS,
            payload: data,
        });

        dispatch(getPostById(postId));
    } catch (error) {
        dispatch({
            type: REMOVE_COMMENT_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};
