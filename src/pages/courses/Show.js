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
        <div className='flex'>
          <div className='w-1/2 p-4'>
            <h1>Course Details</h1>
            <h2>Course: {id}</h2>
            {authenticated ? (
              <div className='flex justify-end gap-2 px-2'>
                <button className="btn btn-primary">
                  <Link to={`/courses/edit/${id}`}>Edit</Link>
                </button>
                <button className="btn btn-error" onClick={handleDelete}>Delete</button>
              </div>
            ) : null}
      
                <h2>{course.data.code}</h2>
                <h2>{course.data.description}</h2>
            </div>
            <div className='w-1/2 p-4'>
                <ul>
                    {course.data.enrolments.map(enrolment => (
                        <li key={enrolment.id}>
                            <div className="card  bg-neutral text-primary-content mb-8">
                                <div className="card-body">
                                    <h2 className="card-title"> <strong>Lecturer Name:</strong> {enrolment.lecturer.name}</h2>
                                    <strong>Status:</strong> {enrolment.status}
                                    <div className="card-actions justify-end">
                                        <Link to={`/lecturer/${enrolment.lecturer_id}`}>
                                            <button className="btn">View</button></Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Show;
