import axios from 'axios';
import {
    GET_POSTS_FAIL,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
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
    } catch (error) {
        dispatch({
            type: UPDATE_LIKES_FAIL,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};
