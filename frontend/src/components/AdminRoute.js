import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const AdminRoute = ({ component: Component }) => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.loadedUser);
    const { loading, userInfo } = user;

    if (loading) return <Loader />;
    if (userInfo) {
        if (userInfo.isAdmin) {
            return <Component />;
        }
        return navigate('/home');
    }
    return navigate('/login');
};

export default AdminRoute;
