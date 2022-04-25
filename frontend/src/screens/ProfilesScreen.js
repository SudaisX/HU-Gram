import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../actions/profileActions';
import Loader from '../components/Loader';
import ProfileCard from '../components/ProfileCard';

const ProfilesScreen = () => {
    const [profiles, setProfiles] = useState([]);

    const dispatch = useDispatch();
    const { profiles: allProfiles, loading } = useSelector((state) => state.allProfiles);

    useEffect(() => {
        if (!allProfiles) {
            dispatch(getAllProfiles());
        } else {
            setProfiles(allProfiles);
        }
    }, [dispatch, allProfiles, profiles]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Container className='mt-3 mb-5'>
                    <h1 className='mt-3' style={{ textAlign: 'center' }}>
                        Fellows
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        <i className='fa-solid fa-users'></i> Browse and Connect with likeminded
                        fellows
                    </p>

                    <Row>
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                // <ProfileCard key={profile._id} profile={profile} />
                                <Col key={profile._id} sm={12} md={6} lg={4} xl={3}>
                                    <ProfileCard profile={profile} />
                                </Col>
                            ))
                        ) : (
                            <h4 style={{ textAlign: 'center' }} className='mt-5'>
                                No Profiles found.. :(
                            </h4>
                        )}{' '}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default ProfilesScreen;
