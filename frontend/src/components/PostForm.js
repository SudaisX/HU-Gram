import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/postActions';
import { getCurrentProfile } from '../actions/profileActions';
import Loader from './Loader';

const PostForm = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const userProfile = useSelector((state) => state.userProfile);
    const { loading, profile } = userProfile;

    useEffect(() => {
        dispatch(getCurrentProfile());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = () => {};

    if (loading !== false) return <Loader />;

    return (
        <>
            {!profile ? (
                ''
            ) : (
                <Card className='mt-5' style={{ width: '80%' }}>
                    <Card.Body>
                        <Row>
                            <Col md={2} style={{ textAlign: 'center' }}>
                                <Link to={`/profile/${profile.user._id}`}>
                                    <Card.Img
                                        src={profile.pfp}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </Link>
                                <Card.Title className='mt-2'>{profile.user.name}</Card.Title>
                            </Col>

                            <Col>
                                <Row>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='text' className='mt-3'>
                                            <Form.Control
                                                as='textarea'
                                                rows={2}
                                                type='text'
                                                placeholder={`What's on your mind, ${profile.user.name}?`}
                                                value={text}
                                                onChange={(e) =>
                                                    setText(e.target.value)
                                                }></Form.Control>
                                        </Form.Group>{' '}
                                    </Form>
                                </Row>
                                <Row>
                                    <div
                                        className='mt-3'
                                        style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button onClick={() => dispatch(createPost({ text }))}>
                                            Post
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

export default PostForm;
