import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../actions/profileActions';
import DashboardButtons from '../components/DashboardButtons';
import Education from '../components/Education';
import Experiences from '../components/Experiences';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DashboardScreen = () => {
    const [name, setName] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);

    const dispatch = useDispatch();
    const { loading, profile } = useSelector((state) => state.userProfile);
    const { success } = useSelector((state) => state.profileUpdate);

    useEffect(() => {
        if (!profile) {
            dispatch(getCurrentProfile());
        } else {
            setName(profile.user.name);
            setExperiences(profile.experience);
            setEducation(profile.education);
        }
    }, [dispatch, profile]);

    if (loading) return <Loader />;

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
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
                                <Link className='btn btn-primary' to='/profile/create'>
                                    Create Profile
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <DashboardButtons />

                            <h2 className='mt-5'>Experiences</h2>
                            <Experiences experience={experiences} />

                            <h2 className='mt-5'>Education</h2>
                            <Education education={education} />
                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default DashboardScreen;
