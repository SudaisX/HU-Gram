import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = ({ userInfo }) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <Navbar expand='lg' variant='dark' style={{ backgroundColor: 'rgba(33,33,33,0.95)' }}>
            <Container style={{ maxWidth: '92%' }}>
                <LinkContainer to='/'>
                    <Navbar.Brand href='#home'>
                        <span className='logo-hu'>HU</span>
                        <span className='logo-gram'>Gram</span>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto' style={{ marginLeft: '40px' }}>
                        <LinkContainer to='/home'>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/events'>
                            <Nav.Link>Events</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/projects'>
                            <Nav.Link>Projects</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/faqs'>
                            <Nav.Link>FAQs</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Nav style={{ marginLeft: 'auto' }}>
                        <LinkContainer to='/fellows'>
                            <Nav.Link>
                                <i className='fa-solid fa-users'></i> Fellows
                            </Nav.Link>
                        </LinkContainer>

                        <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    <i className='fas fa-user'></i> Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/dashboard'>
                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                            </LinkContainer>

                            {userInfo.isAdmin ? (
                                <>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='/users'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                </>
                            ) : (
                                ''
                            )}

                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                <i className='fas fa-sign-out-alt'></i> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
