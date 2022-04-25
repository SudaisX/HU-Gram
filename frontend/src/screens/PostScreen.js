import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addLike, deletePost, getPostById, removeLike } from '../actions/postActions';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import Loader from '../components/Loader';

const PostScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById(params.id));
    }, [dispatch, params.id]);

    const user = useSelector((state) => state.loadedUser);
    const { userInfo } = user;
    const { loading, post } = useSelector((state) => state.postById);

    const deleteHandler = (id) => {
        dispatch(deletePost(id));
    };

    return (
        <>
            {loading !== false ? (
                <Loader />
            ) : (
                <>
                    <Container className='mt-3 mb-5'>
                        <Link className='btn btn-light my-3' to='/home'>
                            {'< Back to Posts'}
                        </Link>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={2} style={{ textAlign: 'center' }}>
                                        <Link to={`/profile/${post.user}`}>
                                            <Card.Img
                                                src={post.avatar}
                                                style={{
                                                    height: '100px',
                                                    width: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </Link>
                                        <Card.Title className='mt-2'>{post.name}</Card.Title>
                                    </Col>
                                    <Col>
                                        <Row style={{ minHeight: '74px' }}>
                                            <Card.Text>{post.text}</Card.Text>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className='post-date'>
                                                    {post.likes.length} likes,{' '}
                                                    {post.comments.length} comments
                                                </p>
                                            </Col>
                                            <Col>
                                                <p
                                                    className='post-date'
                                                    style={{ textAlign: 'end' }}>
                                                    Posted on{' '}
                                                    <Moment format='YYYY/MM/DD'>
                                                        {post.createdAt}
                                                    </Moment>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div>
                                                <Button
                                                    onClick={() => dispatch(addLike(post._id))}
                                                    className='btn-vlight'
                                                    style={{ marginRight: '20px' }}>
                                                    <i className='fas fa-thumbs-up'></i>
                                                </Button>
                                                <Button
                                                    onClick={() => dispatch(removeLike(post._id))}
                                                    className='btn-vlight'
                                                    style={{ marginRight: '20px' }}>
                                                    <i className='fas fa-thumbs-down'></i>
                                                </Button>

                                                {post.user === userInfo._id && (
                                                    <Button
                                                        variant='danger'
                                                        onClick={() => deleteHandler(post._id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                )}
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <CommentForm postId={params.id} />

                        {post.comments.map((comment) => (
                            <Comment key={comment._id} post={post} comment={comment} />
                        ))}
                    </Container>
                </>
            )}
        </>
    );
};

export default PostScreen;
