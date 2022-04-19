import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';
import Loader from '../components/Loader';

const DashboardScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, []);

    const { loading, profile } = useSelector((state) => state.userProfile);

    if (loading) return <Loader />;

    return <>Dashboard Screen</>;
};

export default DashboardScreen;
