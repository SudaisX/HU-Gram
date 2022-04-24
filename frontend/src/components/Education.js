import React from 'react';
import Moment from 'react-moment';
import { Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../actions/profileActions';

const Education = ({ education }) => {
    const dispatch = useDispatch();

    const deleteHandler = (eduId) => {
        if (window.confirm(`Are you sure you want to delete this education?`)) {
            dispatch(deleteEducation(eduId));
        }
    };

    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </td>
            <td>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(edu._id)}>
                    <i className='fas fa-trash'></i>
                </Button>
            </td>
        </tr>
    ));
    return (
        <>
            <Table striped bordered hover responsive className='table-sm mb-5' size='sm'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </Table>
        </>
    );
};

export default Education;
