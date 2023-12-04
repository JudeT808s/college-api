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
  }, []);

  return (
    <>
      <button class="btn">Button</button>
      <p>Hello from Courses Index</p>
      {coursesList.map(course => (
        <Link to={`/courses/${course.id}`} key={course.id}>
          <div>{course.title}</div>
        </Link>
      ))}
    </>
  );
}

export default Index;
