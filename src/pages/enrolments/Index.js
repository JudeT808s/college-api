import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Index = () => {
  const [enrolmentsList, setEnrolmentsList] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    // Change this to a default domain to simplify soon
    axios.get(`https://college-api.vercel.app/enrolments`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setEnrolmentsList(response.data.data);
        console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      <button className="btn">Button</button>
      <p>Hello from Enrolments Index</p>
      {enrolmentsList.map(enrolments => (
      
        <Link to={`/enrolment/${enrolments.id}`} key={enrolments.id}>
          <div>
            <h2>{enrolments.name}</h2>
            <h2>{enrolments.status}</h2>
          </div>
          </Link>
        
      ))}
    </>
  );
}

export default Index;
