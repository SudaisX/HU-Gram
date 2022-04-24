import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentProfile } from '../actions/profileActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DashboardScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const { loading, profile } = useSelector((state) => state.userProfile);
    const { success } = useSelector((state) => state.profileUpdate);

    useEffect(() => {
        if (!profile) {
            dispatch(getCurrentProfile());
        } else {
            setName(profile.user.name);
        }
    }, [dispatch, profile]);

    if (loading) return <Loader />;

    return (
        <>
            <Container className='mt-3'>
                {success ? <Message>Profile Updated Successfully!</Message> : ''}
                <h1 className='mt-3' style={{ textAlign: 'center' }}>
                    Dashboard
                </h1>
                <p style={{ textAlign: 'center' }}>
                    <i className='fas fa-user'></i> Welcome {name}
                </p>
                {!profile ? (
                    <>
                        <p style={{ textAlign: 'center', marginTop: '100px' }}>
                            Hello, you have not yet created a profile, please make one :(
                        </p>
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={() => navigate('/profile/create')} variant='primary'>
                                Create Profile
                            </Button>
                        </div>
                    </>
                ) : (
                    <>has a profile</>
                )}
            </Container>
        </>
    );
};

export default DashboardScreen;
