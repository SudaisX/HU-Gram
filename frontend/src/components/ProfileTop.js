import React from 'react';

const ProfileTop = ({
    profile: {
        user: { name },
        major,
        batch,
        pfp,
        social,
        website,
    },
}) => {
    return (
        <div className='profile-top bg-primary'>
            <img className='mt-1' src={pfp} alt='' />
            <h1 className='mt-3' style={{ color: '#edd5bd' }}>
                {name}
            </h1>
            <p className='lead'>{major}</p>
            <p>
                <span>Class of {batch}</span>
            </p>
            <div className='icons my-1'>
                {website ? (
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x' />
                    </a>
                ) : null}
                {social
                    ? Object.entries(social)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => (
                              <a key={key} href={value} target='_blank' rel='noopener noreferrer'>
                                  <i className={`fab fa-${key} fa-2x`}></i>
                              </a>
                          ))
                    : null}
            </div>
        </div>
    );
};

export default ProfileTop;
