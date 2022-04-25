import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../actions/profileActions';
import Loader from '../components/Loader';
import ProfileAbout from '../components/ProfileAbout';
import ProfileEducation from '../components/ProfileEducation';
import ProfileExperience from '../components/ProfileExperience';
import ProfileTop from '../components/ProfileTop';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { loading, profile } = useSelector((state) => state.userProfile);

    useEffect(() => {
        if (!profile) {
            dispatch(getCurrentProfile());
        }
    }, [dispatch, profile]);

    return (
        <>
            {loading !== false ? (
                <Loader />
            ) : (
                <Container style={{ marginTop: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link className='btn btn-light my-3' to='/fellows'>
                            {'< Back to Profiles'}
                        </Link>
                        <Link className='btn btn-vlight my-3' to='/profile/edit'>
                            <i className='fas fa-user'></i> Edit Profile
                        </Link>
                    </div>

                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />

                        <div className='profile-exp'>
                            <h2 className='text-primary' style={{ textAlign: 'center' }}>
                                Experience(s)
                            </h2>
                            {profile.experience.length > 0 ? (
                                <>
                                    {profile.experience.map((experience) => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4 style={{ textAlign: 'center' }}>No experience credentials</h4>
                            )}
                        </div>

                        <div className='profile-edu'>
                            <h2 className='text-primary' style={{ textAlign: 'center' }}>
                                Education
                            </h2>
                            {profile.education.length > 0 ? (
                                <>
                                    {profile.education.map((education) => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4 style={{ textAlign: 'center' }}>No education credentials</h4>
                            )}
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

export default ProfileScreen;
