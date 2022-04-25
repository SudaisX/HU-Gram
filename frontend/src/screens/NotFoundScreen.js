import React from 'react';
import { Container } from 'react-bootstrap';

export const NotFoundScreen = () => {
    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>
                <i className='fas fa-exclaimation-triangle'></i> Page Not Found
            </h1>
        </Container>
    );
};
