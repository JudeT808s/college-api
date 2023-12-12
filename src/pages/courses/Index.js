import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Index = () => {
  const [coursesList, setCoursesList] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    // Change this to a default domain to simplify soon
    axios.get(`https://college-api.vercel.app/courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCoursesList(response.data.data);
        console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
      {coursesList.map((course) => (
        <Link to={`/course/${course.id}`} key={course.id}>
          <div className="card w-80 bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-2">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <div className="card-actions flex justify-end">
              <Link to={`/course/${course.id}`} key={course.id}>
 <button className="btn btn-primary">View</button></Link>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Index;
