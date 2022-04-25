import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from '../actions/postActions';
import { Button, Card, Col, Row } from 'react-bootstrap';

const PostItem = ({ post }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.loadedUser);
    const { userInfo } = user;

    const deleteHandler = (id) => {
        dispatch(deletePost(id));
    };

    return (
        <Card className='mt-5' style={{ width: '80%' }}>
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
                                    {post.likes.length} likes, {post.comments.length} comments
                                </p>
                            </Col>
                            <Col>
                                <p className='post-date' style={{ textAlign: 'end' }}>
                                    Posted on <Moment format='YYYY/MM/DD'>{post.createdAt}</Moment>
                                </p>
                            </Col>
                        </Row>
                        <Row></Row>
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
                                <Link
                                    to={`/post/${post._id}`}
                                    className='btn btn-primary'
                                    style={{ marginRight: '20px' }}>
                                    Comment
                                </Link>
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
    );
};

export default PostItem;
