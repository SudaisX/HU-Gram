import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getCurrentProfile, addEducation } from '../actions/profileActions';

const AddEducationScreen = () => {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [field, setField] = useState('');
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
        const educationData = {
            school,
            degree,
            fieldofstudy: field,
            location,
            to: current ? '' : toDate,
            from: fromDate,
            current,
            description,
        };
        dispatch(addEducation(educationData));
        console.log(educationData);
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
                        Add Education
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        <i className='fas fa-user'></i> Let's make you stand out
                    </p>

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='school' className='mt-3'>
                            <Form.Label>School*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Your School Name'
                                value={school}
                                required
                                onChange={(e) => setSchool(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='degree' className='mt-3'>
                            <Form.Label>Degree*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the type of degree you were/are persuing'
                                value={degree}
                                required
                                onChange={(e) => setDegree(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='field' className='mt-3'>
                            <Form.Label>Field*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='What field were you persuing an education in?'
                                value={field}
                                required
                                onChange={(e) => setField(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='location' className='mt-3'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Location of your school'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='fromDate' className='mt-3'>
                            <Form.Label>From Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder='When did you start your education?'
                                value={fromDate}
                                required
                                onChange={(e) => setFromDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='toDate' className='mt-3'>
                            <Form.Label>To Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder='When did your education end?'
                                value={toDate}
                                disabled={current ? 'disabled' : ''}
                                onChange={(e) => setToDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='current' className='mt-3'>
                            <div key='inline-checkbox' className='mb-3 mt-2'>
                                <Form.Check
                                    inline
                                    label='Currently Studying there?'
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
                                placeholder='Add something about your education'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-5 mb-5'>
                            Add Education
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    );
};

export default AddEducationScreen;
