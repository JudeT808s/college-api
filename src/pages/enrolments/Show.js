import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Show = (authenticated) => {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState(null);
  const [lecturers, setLecturers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);

    axios.get(`https://college-api.vercel.app/enrolments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setEnrolment(response.data);

  
        if (response.data.lecturer && Array.isArray(response.data.lecturer)) {
          setLecturers(response.data.lecturer);
        } else {
          setLecturers([]);
        }
      })
      .catch(err => {
        setError(err.message || 'Error fetching enrolment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, token]);

  const handleDelete = async () => {
    try {
      // Delete the enrollment
      await axios.delete(`https://college-api.vercel.app/enrolments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Enrolment deleted:', id)
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!enrolment) {
    return <h3>Enrolment not found</h3>;
  }

  return (
    <>
      {authenticated ? (
        <div className='flex justify-end gap-2 px-2'>
          <button className="btn btn-primary">
            <Link to={`/enrolment/edit/${id}`}>Edit</Link>
            </button>
          <button className="btn btn-error" onClick={handleDelete}>Delete</button>
        </div>
       ) : ( 
        null)}
      <h2>{enrolment.data.code}</h2>
      <h2>{enrolment.data.description}</h2>
      <h2>{enrolment.data.lecturer.name}</h2>
      <h2>{enrolment.data.lecturer.email}</h2>
    </>
  );
};

export default Show;
