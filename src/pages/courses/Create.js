import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Create = () => {
  const { id } = useParams();
  const [enrolmentData, setEnrolmentData] = useState({
    studentName: '',
    courseCode: '',
    // Add more properties as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrolmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add enrolment
      const response = await axios.post(
        `https://college-api.vercel.app/courses`,
        enrolmentData
      );

      console.log('Enrolment added:', response.data);

      // Clear the form or update the UI as needed
      setEnrolmentData({
        studentName: '',
        courseCode: '',
        // Add more properties as needed
      });
    } catch (error) {
      console.error('Error adding enrolment:', error);
    }
  };

  return (
    <div>
      <h3>Add Enrolment to Course {id}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            name="studentName"
            value={enrolmentData.studentName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Course Code:
          <input
            type="text"
            name="courseCode"
            value={enrolmentData.courseCode}
            onChange={handleChange}
          />
        </label>
        {/* Add more input fields for other enrolment properties */}
        <br />
        <button type="submit">Add Enrolment</button>
      </form>
    </div>
  );
};

export default Create;
