import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const DashboardScreen = () => {
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const { loading, profile } = useSelector((state) => state.userProfile);

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
            <FormContainer>
                <h1>Dashboard</h1>
            </FormContainer>
        </>
    );
};

export default DashboardScreen;
