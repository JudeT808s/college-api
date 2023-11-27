import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
  const [coursesList, setCoursesList] = useState([]);
  //Token will be taken from register object orientated
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTNmZTExYzFjOTUxODE5NzVlMjNkOWNkYWJjZjFjNmQ1MWU3ODI0MjQ0OWIxOWM3NDk1YWYwY2I5NjA5NWFiYzE0MjE5OGU3ZWZlZGVjYWYiLCJpYXQiOiIxNzAxMTI3MDI3Ljk2MTM4OSIsIm5iZiI6IjE3MDExMjcwMjcuOTYxMzkyIiwiZXhwIjoiMTczMjc0OTQyNy45NDk4MzQiLCJzdWIiOiI1MyIsInNjb3BlcyI6W119.gBoVPKYnL4zmS8mwbQQnAkDalSQ3A7fj14-yQqKIYNAEVDD3Ne1stBDHWGZvfpUm6QIWSEWH6aylJyO9f0Rc_t4MspKD0P0MBT8rPjVQwxoI_7zu5033EJEjTh8zbtlhBAn7z7ipGuOTZxCAggcLXiILaDu_MS86FL3rdxRwpFKPu-ClNdiFAZ4sZVBUEotcJzaH51nMlCJu8Wd8fhonQH5NHk7Tpan4xlP-jkRKRb-kZk25VRwA7dQ_fF7K4IUrN5mNQdyI7Hkm1r5elAVtH0d4nxZ7uE4gwNu46UBrYwW_X0GRSo-ktQSp9UDAKWoxeLT4tcbOKzD0NvdTMBeZXdtGOMvS8AsctU-UgHrZOVFJ3B1K7AW2dSIZNLhSC6Ogt9JNurNGXYJOTvW8qPYBoGEMqoDofZKWkCUVR79vE1xDJSIQ2zCebujI2kvRLQQuiI3vJNJF1iNq5_4uh73mQwHJyqvOPhrgGBravfawrbzal4_UBWpQglRi4HGi5Re81IQYV4qBZph7-1T27sh3lQjgfjqWW35Xe6BmhDB05Eh7sKBvoFugJKlTTtkhwGoe3Tfrg4Hrkh5sXfSxPeOreqZu1vxsKUaQJ-q_N9bwQJQCfrkFgBYOzhtekDbpLux-cu4Jb5UaGsnuderXvfmrfVUn28pRAbfqAFy9sMF1J6s`
  useEffect(() => {
    //Change this to a default domain to simplify soon
    axios.get(`https://college-api.vercel.app/courses`,
      {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCoursesList(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <p>Hello from Courses Index</p>
  );
}

export default Index;
