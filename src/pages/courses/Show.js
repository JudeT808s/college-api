import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Show = (authenticated) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null); // Change to null to represent an object
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/courses/${id}`, {
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

    const handleDelete = async () => {
        try {
          // Make a DELETE request to delete the course
          const response = await axios.delete(
            `https://college-api.vercel.app/courses/${id}`,
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
            <h2>Course: {id}</h2>
            {authenticated ? (
                <>
                    {/* Change links to be passed info from props to improve efficiency */}
                    <Link to={`/courses/edit/${id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete Course</button>
                    </>
            ) : null}

            <h2>{course.data.code}</h2>
            <h2>{course.data.description}</h2>
            <ul>
                {course.data.enrolments.map(enrolment => (
                    <li key={enrolment.id}>
                        <strong>Lecturer Name:</strong> {enrolment.lecturer.name}
                        <br />
                        <strong>Status:</strong> {enrolment.status}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Show;
