import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Index = () => {
  const [lecturesList, setLecturersList] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    // Change this to a default domain to simplify soon
    axios.get(`https://college-api.vercel.app/lecturers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setLecturersList(response.data.data);
        console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      <button className="btn">Button</button>
      <p>Hello from Courses Index</p>
      {lecturesList.map(lecturer => (
        <Link to={`/lecturer/${lecturer.id}`} key={lecturer.id}>
          <div>{lecturer.name}</div>
        </Link>
      ))}
    </>
  );
}

export default Index;
