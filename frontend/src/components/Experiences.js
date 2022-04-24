import React from 'react';
import Moment from 'react-moment';
import { Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../actions/profileActions';

const Experiences = ({ experience }) => {
    const dispatch = useDispatch();

    const deleteHandler = (expId) => {
        if (window.confirm(`Are you sure you want to delete this experience?`)) {
            dispatch(deleteExperience(expId));
        }
    };

    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {exp.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
            </td>
            <td>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(exp._id)}>
                    <i className='fas fa-trash'></i>
                </Button>
            </td>
        </tr>
    ));
    return (
        <>
            <Table striped bordered hover responsive className='table-sm mb-3' size='sm'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </Table>
        </>
    );
};

export default Experiences;
