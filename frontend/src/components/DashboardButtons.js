import React from 'react';
import { Link } from 'react-router-dom';

const DashboardButtons = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/profile/add-experience' className='btn btn-vlight'>
                <i className='fab fa-black-tie'></i> Add Experience
            </Link>
            <Link to='/profile/edit' className='btn btn-vlight'>
                <i className='fas fa-user'></i> Edit Profile
            </Link>
            <Link to='/profile/add-education' className='btn btn-vlight'>
                <i className='fas fa-graduation-cap'></i> Add Education
            </Link>
        </div>
    );
};

export default DashboardButtons;
