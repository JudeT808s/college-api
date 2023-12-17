import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Index = () => {
  const [lecturersList, setLecturersList] = useState([]);
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
    
      <p>Hello from Courses Index</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lecturersList.map(lecturer => (
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={`https://ui-avatars.com/api/?name=${lecturer.name}&size=256&rounded=true`}
                alt="lecturer avatar"
                className="rounded-full w-32 h-32 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{lecturer.name}</h2>
              <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
            <Link to={`/lecturer/${lecturer.id}`} key={lecturer.id}>
                <button className="btn btn-primary">View</button>
                </Link>
              </div>
            </div>
          </div>
      ))}
        </div>
    </>
  );
}

export default Index;
