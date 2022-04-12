import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand='lg' variant='dark' style={{ backgroundColor: 'rgba(33,33,33,0.95)' }}>
            <Container style={{ maxWidth: '92%' }}>
                <Navbar.Brand href='#home'>
                    <span className='logo-hu'>HU</span>
                    <span className='logo-gram'>Gram</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto' style={{ marginLeft: '40px' }}>
                        <Nav.Link href='#home'>Home</Nav.Link>
                        <Nav.Link href='#link'>Events</Nav.Link>
                        <Nav.Link href='#link'>FAQs</Nav.Link>
                        <Nav.Link href='#link'>About</Nav.Link>
                    </Nav>

                    <Nav style={{ marginLeft: 'auto' }}>
                        <NavDropdown title='Username' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='#action/3.1'>Profile</NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.1'>Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='#action/3.2'>Users</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='#action/3.4'>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
