import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import {  Link } from 'react-router-dom';

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

        if (Array.isArray(response.data.lecturer)) {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!enrolment) {
    return <h3>Enrolment not found</h3>;
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://college-api.vercel.app/enrolment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Enrolment deleted:', response.data);
    } catch (error) {
      console.error('Error deleting enrolment:', error);
    }
  };

  return (
    <>
    {authenticated ? (
      <div>
        <Link to={`/enrolment/edit/${id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    ) : (
      <h2>No</h2>
    )}
      <h2>{enrolment.data.code}</h2>
      <h2>{enrolment.data.description}</h2>
      <h2>{enrolment.data.lecturer.name}</h2>
      <h2>{enrolment.data.lecturer.email}</h2>
    </>
  );
};

export default Show;
