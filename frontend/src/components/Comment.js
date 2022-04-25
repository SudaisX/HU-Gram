import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deleteComment } from '../actions/postActions';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Comment = ({ comment, post }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.loadedUser);
    const { userInfo } = user;

    const deleteHandler = (id) => {
        dispatch(deleteComment(post._id, id));
    };

    return (
        <Card className='mt-5'>
            <Card.Body>
                <Row>
                    <Col md={2} style={{ textAlign: 'center' }}>
                        <Link to={`/profile/${comment.user}`}>
                            <Card.Img
                                src={comment.avatar}
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </Link>
                        <Card.Title className='mt-2'>{comment.name}</Card.Title>
                    </Col>
                    <Col>
                        <Row style={{ minHeight: '74px' }}>
                            <Card.Text>{comment.text}</Card.Text>
                        </Row>
                        <Row>
                            <Col>
                                <p className='post-date' style={{ textAlign: 'end' }}>
                                    Posted on{' '}
                                    <Moment format='YYYY/MM/DD'>{comment.createdAt}</Moment>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <div>
                                {comment.user === userInfo._id && (
                                    <Button
                                        variant='danger'
                                        onClick={() => deleteHandler(comment._id)}>
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

export default Comment;
