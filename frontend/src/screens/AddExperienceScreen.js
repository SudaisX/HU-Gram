import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getCurrentProfile, addExperience } from '../actions/profileActions';

const AddExperienceScreen = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [current, setCurrent] = useState(false);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userProfile = useSelector((state) => state.userProfile);
    const { loadingProfile } = userProfile;

    const profileUpdate = useSelector((state) => state.profileUpdate);
    const { loading, error } = profileUpdate;

    useEffect(() => {
        if (userProfile.profile) {
            // return navigate('/dashboard');
        } else {
            dispatch(getCurrentProfile());
        }
    }, [userProfile.profile, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        const experienceData = {
            title,
            company,
            location,
            to: current ? '' : toDate,
            from: fromDate,
            current,
            description,
        };
        dispatch(addExperience(experienceData));
        console.log(experienceData);
        return navigate('/dashboard');
    };

    return (
        <>
            {loading || loadingProfile ? (
                <Loader />
            ) : (
                <FormContainer>
                    {error && error.map((err) => <Message variant='danger'>{err.msg}</Message>)}

                    <Link className='btn btn-light my-3' to='/dashboard'>
                        {'< Go Back'}
                    </Link>
                    <h1 className='mt-3' style={{ textAlign: 'center' }}>
                        Add Experience
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        <i className='fas fa-user'></i> Let's make you stand out
                    </p>

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='title' className='mt-3'>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Your Experience Title'
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='company' className='mt-3'>
                            <Form.Label>Company*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the Name of the company where you obtained this Experience'
                                value={company}
                                required
                                onChange={(e) => setCompany(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='location' className='mt-3'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Where did you obtain this experience?'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='fromDate' className='mt-3'>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder='When did you start?'
                                value={fromDate}
                                required
                                onChange={(e) => setFromDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='toDate' className='mt-3'>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder='When did you end?'
                                value={toDate}
                                disabled={current ? 'disabled' : ''}
                                onChange={(e) => setToDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='current' className='mt-3'>
                            <div key='inline-checkbox' className='mb-3 mt-2'>
                                <Form.Check
                                    inline
                                    label='Currently Working?'
                                    name='current'
                                    type='checkbox'
                                    id={`inline-checkbox`}
                                    checked={current}
                                    onChange={() => setCurrent(!current)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId='description' className='mt-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                rows={3}
                                placeholder='Your Experience description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-5 mb-5'>
                            Add Experience
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    );
};

export default AddExperienceScreen;
