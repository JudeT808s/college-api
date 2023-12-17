import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Show = (authenticated) => {
    const { id } = useParams();
    const [lecturer, setLecturer] = useState(null);
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/lecturers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // console.log(response.data);
                setLecturer(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id, token]);
 
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
            <div className="container mx-auto grid grid-cols-3 gap-8">
                <div className="col-span-3 md:col-span-1 flex flex-col items-center justify-center mb-8 md:mb-0">
                    <h1 className="text-center text-2xl font-semibold mb-4">
                        <strong>{lecturer.data.name}</strong>
                    </h1>
                    {lecturer.data && (
                        <img
                            src={`https://ui-avatars.com/api/?name=${lecturer.data.name}&size=256&rounded=true`}
                            alt="lecturer avatar"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    )}
                </div>

                <div className="col-span-3 md:col-span-1">
                    <div className="card bg-neutral text-neutral-content mb-4">
                        <div className="card-body text-center">
                            <h2>{lecturer.data.address}</h2>
                            <h2>{lecturer.data.email}</h2>
                            <h2>{lecturer.data.phone}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 md:col-span-1">
                    {lecturer.data.enrolments.length > 0 ? (
                        <ul>
                            {lecturer.data.enrolments.map(enrolment => (
                                <div className="card w-96 bg-neutral text-neutral-content mb-4" key={enrolment.id}>
                                    <div className="card-body text-center">
                                        <h2 className="card-title">Course Code: {enrolment.course.code}</h2>
                                        <p><strong>Status:</strong> {enrolment.status}</p>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <h2>No Enrolments</h2>
                    )}
                </div>
            </div>




        </>
    );
}

export default Show;
