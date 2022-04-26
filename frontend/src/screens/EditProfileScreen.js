import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getCurrentProfile, createUpdateProfile } from '../actions/profileActions';
import axios from 'axios';

const EditProfileScreen = () => {
    const [birthday, setBirthday] = useState('');
    const [pfp, setPfp] = useState('');
    const [uploading, setUploading] = useState('');
    const [major, setMajor] = useState('Computer Science');
    const [minor, setMinor] = useState('');
    const [batch, setBatch] = useState('2024');
    const [skills, setSkills] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [interests, setInterests] = useState('');
    const clubNames = [
        'Adventure Club',
        'Araaish-e-Khayaal',
        'Arts and Cultural Club',
        'CSEC',
        'Debate Union',
        'Dream Stage',
        'Gaming Club',
        'Healthy Life Club',
        'Math Club',
        'Moseequi and Raqs',
        'Multiverse Club',
        'Natural Science Club',
        'Philosophy Club',
        'Pride Press',
        'Serve Club',
        'Sports and Rec Club',
        'Sustainibility Club',
        'Young Leaders Club',
        'Photography Club',
        'Purple Lion Productions',
        'Entrepreneurship Club',
        'Feminist Collective',
    ];
    const [clubs, setClubs] = useState(new Array(clubNames.length).fill(false));
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [youtube, setYoutube] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [instagram, setInstagram] = useState('');
    const [github, setGithub] = useState('');

    const dispatch = useDispatch();

    const userProfile = useSelector((state) => state.userProfile);
    const { loadingProfile } = userProfile;

    const profileUpdate = useSelector((state) => state.profileUpdate);
    const { loading, error, success } = profileUpdate;

    const clubsOnChangeHandler = (position) => {
        const updatedClubsState = clubs.map((item, index) => (index === position ? !item : item));
        setClubs(updatedClubsState);
    };

    useEffect(() => {
        if (userProfile.profile) {
            if (userProfile.profile.birthday)
                setBirthday(userProfile.profile.birthday.split('T')[0]);
            if (userProfile.profile.pfp) setPfp(userProfile.profile.pfp);
            if (userProfile.profile.batch) setBatch(userProfile.profile.batch);
            if (userProfile.profile.major) setMajor(userProfile.profile.major);
            if (userProfile.profile.minor) setMinor(userProfile.profile.minor);
            if (userProfile.profile.skills) setSkills(userProfile.profile.skills.join(', '));
            if (userProfile.profile.hobbies) setHobbies(userProfile.profile.hobbies.join(', '));
            if (userProfile.profile.interests)
                setInterests(userProfile.profile.interests.join(', '));
            if (userProfile.profile.bio) setBio(userProfile.profile.bio);
            if (userProfile.profile.website) setWebsite(userProfile.profile.website);

            if (userProfile.profile.social) {
                if (userProfile.profile.social.youtube)
                    setYoutube(userProfile.profile.social.youtube);
                if (userProfile.profile.social.facebook)
                    setFacebook(userProfile.profile.social.facebook);
                if (userProfile.profile.social.twitter)
                    setTwitter(userProfile.profile.social.twitter);
                if (userProfile.profile.social.linkedin)
                    setLinkedin(userProfile.profile.social.linkedin);
                if (userProfile.profile.social.instagram)
                    setInstagram(userProfile.profile.social.instagram);
                if (userProfile.profile.social.github) setGithub(userProfile.profile.social.github);
            }

            if (userProfile.profile.clubs) {
                for (let i = 0; i < clubNames.length; i++) {
                    if (userProfile.profile.clubs.includes(clubNames[i])) {
                        clubsOnChangeHandler(i);
                    }
                }
            }
        } else {
            dispatch(getCurrentProfile());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile.profile]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setPfp(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const finalClubs = [];
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i] === true) {
                finalClubs.push(clubNames[i]);
            }
        }
        // setClubs(finalClubs);

        const profileData = {
            pfp,
            birthday,
            major,
            minor,
            batch,
            skills,
            hobbies,
            interests,
            clubs: finalClubs,
            bio,
            website,
            youtube,
            facebook,
            twitter,
            linkedin,
            instagram,
            github,
        };
        dispatch(createUpdateProfile(profileData));
        // dispatch(login(email, password));
    };

    return (
        <>
            {loading || loadingProfile ? (
                <Loader />
            ) : (
                <FormContainer>
                    {error && error.map((err) => <Message variant='danger'>{err.msg}</Message>)}
                    {success && <Message variant='success'>Profile Updated Successflly</Message>}

                    <Link className='btn btn-light my-3' to='/dashboard'>
                        {'< Go Back'}
                    </Link>
                    <h1 className='mt-3' style={{ textAlign: 'center' }}>
                        Edit Profile
                    </h1>
                    <p style={{ textAlign: 'center' }}>
                        <i className='fas fa-user'></i> Let's make you stand out
                    </p>

                    <Form onSubmit={submitHandler}>
                        <h2>General</h2>
                        <Form.Group controlId='pfp' className='mt-3'>
                            <Form.Label>Profile Picture (jpg, jpeg, png only)</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter a URL for an Image'
                                value={pfp}
                                onChange={(e) => setPfp(e.target.value)}></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='batch' className='mt-3'>
                            <Form.Label>Class of</Form.Label>
                            <Form.Select value={batch} onChange={(e) => setBatch(e.target.value)}>
                                <option value='2022'>2022</option>
                                <option value='2023'>2023</option>
                                <option value='2024'>2024</option>
                                <option value='2025'>2025</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='major' className='mt-3'>
                            <Form.Label>What is your major?</Form.Label>
                            <Form.Select value={major} onChange={(e) => setMajor(e.target.value)}>
                                <option value='Computer Science'>Computer Science</option>
                                <option value='Electrical Engineering'>
                                    Electrical Engineering
                                </option>
                                <option value='Computer Engineering'>Computer Engineering</option>
                                <option value='Social Development and Policy'>
                                    Social Development and Policy
                                </option>
                                <option value='Communication and Design'>
                                    Communication and Design
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='minor' className='mt-3'>
                            <Form.Label>Are you doing any minor?</Form.Label>
                            <Form.Select value={minor} onChange={(e) => setMinor(e.target.value)}>
                                <option value=''></option>
                                <option value='Physics'>Physics</option>
                                <option value='Mathematics'>Mathematics</option>
                                <option value='Computer Science'>Computer Science</option>
                                <option value='Electrical and Computer Engineering'>
                                    Electrical and Computer Engineering
                                </option>
                                <option value='Social Development and Policy'>
                                    Social Development and Policy
                                </option>
                                <option value='Communication and Design'>
                                    Communication and Design
                                </option>
                                <option value='South Asian Music'>South Asian Music</option>
                                <option value='History'>History</option>
                                <option value='Religious Studies'>Religious Studies</option>
                                <option value='Philosophy'>Philosophy</option>
                                <option value='Comparitive Literature'>
                                    Comparitive Literature
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='date' className='mt-3'>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type='date'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='bio' className='mt-3'>
                            <Form.Label>Biography*</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                placeholder='Add a short bio about yourself'
                                value={bio}
                                required
                                onChange={(e) => setBio(e.target.value)}></Form.Control>
                        </Form.Group>

                        <h2 className='mt-5'>Clubs</h2>

                        <Form.Group controlId='clubs' className='mt-3'>
                            <Form.Label>Select any Club(s) you are a part of</Form.Label>
                            <div key='inline-checkbox' className='mb-3 mt-2'>
                                {clubNames.map((club, i) => (
                                    <Form.Check
                                        inline
                                        label={club}
                                        key={club}
                                        name='clubs'
                                        type='checkbox'
                                        id={`inline-checkbox-${i}`}
                                        checked={clubs[i]}
                                        onChange={() => clubsOnChangeHandler(i)}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <h2 className='mt-5'>More About You!</h2>

                        <Form.Group controlId='interests' className='mt-3'>
                            <Form.Label>Interests*</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                rows={3}
                                placeholder='Type in your interests comma seperated.'
                                value={interests}
                                required
                                onChange={(e) => setInterests(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='hobbies' className='mt-3'>
                            <Form.Label>Hobbies*</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                rows={3}
                                placeholder='Type in your hobbies comma seperated.'
                                value={hobbies}
                                required
                                onChange={(e) => setHobbies(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='skills' className='mt-3 mb-3'>
                            <Form.Label>Skills*</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                rows={3}
                                placeholder='Type in your skills comma seperated.'
                                value={skills}
                                required
                                onChange={(e) => setSkills(e.target.value)}></Form.Control>
                        </Form.Group>

                        <h2 className='mt-5'>Socials</h2>

                        <InputGroup className='' onChange={(e) => setWebsite(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fa-solid fa-house'></i>
                            </InputGroup.Text>
                            <FormControl
                                placeholder='https://yourwebsite.com'
                                value={website}
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setTwitter(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-twitter'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={twitter}
                                placeholder='Twitter Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setFacebook(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-facebook'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={facebook}
                                placeholder='Facebook Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setInstagram(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-instagram'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={instagram}
                                placeholder='Instagram Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setYoutube(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-youtube'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={youtube}
                                placeholder='Youtube Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setGithub(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-github'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={github}
                                placeholder='Github Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <InputGroup className='' onChange={(e) => setLinkedin(e.target.value)}>
                            <InputGroup.Text id='basic-addon1'>
                                <i className='fab fa-linkedin'></i>
                            </InputGroup.Text>
                            <FormControl
                                value={linkedin}
                                placeholder='Linkedin Username'
                                aria-label='Username'
                            />
                        </InputGroup>

                        <Button type='submit' variant='primary' className='mt-5 mb-5'>
                            Update Profile
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    );

    // return (

    // );
};

export default EditProfileScreen;
