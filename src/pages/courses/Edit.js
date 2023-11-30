import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    code: '',
    description: '',
    level: '',
    points: '',
    title: '',
    // Add more properties as needed
  });

  const history = useHistory();

  useEffect(() => {
    // Fetch course data based on the provided course id
    axios.get(`https://college-api.vercel.app/courses/${id}`)
      .then(response => {
        setCourseData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the course data
      const response = await axios.put(
        `https://college-api.vercel.app/courses/${id}`,
        courseData
      );

      console.log('Course updated:', response.data);

      // Redirect to the course details page or update the UI as needed
      history.push(`/courses/${id}`);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h3>Edit Course {id}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Code:
          <input
            type="text"
            name="code"
            value={courseData.code}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Level:
          <input
            type="text"
            name="level"
            value={courseData.level}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Points:
          <input
            type="text"
            name="points"
            value={courseData.points}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default Edit;
