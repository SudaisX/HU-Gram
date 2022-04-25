import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../actions/postActions';
import Loader from '../components/Loader';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';

const HomeFeedScreen = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.allPosts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <>
            {loading !== false ? (
                <Loader />
            ) : (
                <Container
                    className='mt-3 mb-5'
                    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 className='mt-3' style={{ textAlign: 'center' }}>
                        Posts
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        <i className='fas fa-user'></i> Welcome to the HU Community
                    </p>

                    <PostForm />

                    {posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </Container>
            )}
        </>
    );
};

export default HomeFeedScreen;
