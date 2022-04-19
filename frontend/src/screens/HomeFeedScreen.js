import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeFeedScreen = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!token) {
            return navigate('/');
        }
    }, [navigate, token]);

    return <div>HomeFeedScreen</div>;
};

export default HomeFeedScreen;
