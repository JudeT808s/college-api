import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Show = (authenticated) => {
    const { id } = useParams();
    const [lecturer, setLecturer] = useState(null); // Change to null to represent an object
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/lecturers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                setLecturer(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id, token]); // Include id and token in the dependency array to trigger the effect on changes

    if (!lecturer) return <h3>lecturer not found</h3>;

    const handleDelete = async () => {
        try {
            // Make a DELETE request to delete the course
            const response = await axios.delete(
                `https://college-api.vercel.app/lecturers/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log('Course deleted:', response.data);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <>
            {authenticated ? (
                <>
                    <Link to={`/lecturers/edit/${id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete lecturer</button>
                </>
            ) : null}

            <h2>{lecturer.data.name}</h2>
            <h2>{lecturer.data.address}</h2>
            <h2>{lecturer.data.email}</h2>
            <h2>{lecturer.data.phone}</h2>
            <div>
                {lecturer.data.enrolments.length > 0 ? (
                    <ul>
                        {lecturer.data.enrolments.map(enrolment => (
                            <li key={enrolment.id}>
                                <strong>Course Code:</strong> {enrolment.course.code}
                                <br />
                                <strong>Status:</strong> {enrolment.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h2>No Enrolments</h2>
                )}
            </div>
        </>
    );
}

export default Show;
