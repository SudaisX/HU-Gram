import React from 'react';

const ProfileTop = ({
    profile: {
        user: { name },
        major,
        minor,
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
            {minor && (
                <p>
                    <span>{minor} Minor</span>
                </p>
            )}

            <p>
                <span>Class of {batch}</span>
            </p>
            <div className='icons my-1'>
                {website ? (
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x' />
                    </a>
                ) : null}

                {social && social.twitter && (
                    <a
                        href={`https://twitter.com/${social.twitter}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <i class='fab fa-twitter fa-2x' />
                    </a>
                )}
                {social && social.facebook && (
                    <a
                        href={`https://www.facebook.com/${social.facebook}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <i class='fab fa-facebook fa-2x' />
                    </a>
                )}
                {social && social.linkedin && (
                    <a
                        href={`https://www.linkedin.com/in/${social.linkedin}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <i class='fab fa-linkedin fa-2x' />
                    </a>
                )}
                {social && social.youtube && (
                    <a href={`${social.youtube}`} target='_blank' rel='noopener noreferrer'>
                        <i class='fab fa-youtube fa-2x' />
                    </a>
                )}
                {social && social.instagram && (
                    <a
                        href={`https://www.instagram.com/${social.instagram}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <i class='fab fa-instagram fa-2x' />
                    </a>
                )}
                {social && social.github && (
                    <a
                        href={`https://www.github.com/${social.github}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <i class='fab fa-github fa-2x' />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileTop;
