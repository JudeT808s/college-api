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
      <p>Hello from Enrolments Index</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2">
      {enrolmentsList.map(enrolments => (
                  <div className="card w-96 bg-base-100 shadow-xl mb-3 ">

          <Link to={`/enrolment/${enrolments.id}`} key={enrolments.id}>
          <div className="card-body">
            <h2>{enrolments.lecturer.name}</h2>
              <h2>{enrolments.status}</h2>
              </div>
          </Link>
          </div>

      ))}
          </div>

    </>
  );
}

export default Index;
