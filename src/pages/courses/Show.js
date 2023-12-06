import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Index = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null); // Change to null to represent an object
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/course/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log(response.data);
            setCourse(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [id, token]); // Include id and token in the dependency array to trigger the effect on changes

    if (!course) return <h3>Course not found</h3>;

    return (
        <>
            <h2>Course: {id}</h2>
            <h2>{course.data.code}</h2>
            <h2>{course.data.description}</h2>
            <ul>
                {course.data.enrolments.map(enrolment => (
                    <li key={enrolment.id}>
                        <strong>Lecturer Name:</strong> {enrolment.lecturer.name}
                        <br />
                        <strong>Status:</strong> {enrolment.status}
                        {/* Add more enrolment details as needed */}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Index;
