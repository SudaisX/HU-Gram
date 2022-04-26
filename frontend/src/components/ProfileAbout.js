import React from 'react';
import Moment from 'react-moment';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        hobbies,
        interests,
        birthday,
        user: { name },
    },
}) => {
    return (
        <div className='profile-about p-2'>
            {bio && (
                <>
                    <h2 className='text-primary'>Biography</h2>
                    <p>{bio}</p>
                    <hr />
                </>
            )}

            <h2 className='text-primary'>
                <i className='fa-solid fa-cake-candles'></i>
            </h2>
            <div className='skills'>
                {birthday && <Moment format='DD/MM/YYYY'>{birthday}</Moment>}
            </div>
            <hr />

            <h2 className='text-primary'>Interests</h2>
            <div className='skills'>
                {interests &&
                    interests.map((skill, index) => (
                        <div key={index} className='p-1'>
                            <i className='fas fa-check' /> {skill}
                        </div>
                    ))}
            </div>
            <hr />

            <h2 className='text-primary'>Hobbies</h2>
            <div className='skills'>
                {hobbies &&
                    hobbies.map((skill, index) => (
                        <div key={index} className='p-1'>
                            <i className='fas fa-check' /> {skill}
                        </div>
                    ))}
            </div>
            <hr />
            <h2 className='text-primary'>Skills</h2>
            <div className='skills'>
                {skills &&
                    skills.map((skill, index) => (
                        <div key={index} className='p-1'>
                            <i className='fas fa-check' /> {skill}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProfileAbout;
