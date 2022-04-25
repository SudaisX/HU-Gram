import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ experience: { company, from, to, title, location, description } }) => {
    return (
        <div>
            <h3 className='text-dark'>{company}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
                {to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <span style={{ fontWeight: 'bolder' }}>Position: </span> {title}
            </p>
            <p>
                <strong>Location: </strong> {location}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    );
};

export default ProfileExperience;
