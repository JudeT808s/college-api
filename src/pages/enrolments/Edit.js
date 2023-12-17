import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { set } from 'react-hook-form';

const Edit = () => {
  const { id } = useParams();
  const [coursesList, setCoursesList] = useState([]);
  const [lecturersList, setLecturersList] = useState([]);
  const [form, setForm] = useState({
    course: `{form.course}`,
    lecturer: `{form.lecturer}`, 
    Status: 'Interested',
  });

  let token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch course data based on the provided course id
    axios.get(`https://college-api.vercel.app/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setForm(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [token, id]);
  useEffect(() => {
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

  useEffect(() => {
    axios.get(`https://college-api.vercel.app/lecturers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setLecturersList(response.data.data);
        // console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
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
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log('Course updated:', response.data);
  
      // Redirect to the course details page or update the UI as needed
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  

  return (
    <>
      This is the enrolments edit Form
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Time:
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
      </label>
      <br />
      <label> Course:
      <select id="course" name="course">
        {coursesList.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
        </select>
      </label>
      <br/>
      <label> Lecturer:
      <select id="lecturer" name="lecturer">
        {lecturersList.map((lecturer) => (
          <option key={lecturer.id} value={lecturer.id}>
            {lecturer.name}
          </option>
        ))}
        </select>
      </label>
      <br />
      <label>
        {/* Loop through somewhere? */}
        Status:
        <select id="status" name="Status" onChange={handleChange} value={form.Status}>
          <option value="Interested">Interested</option>
          <option value="Assigned">Assigned</option>
          <option value="Associate">Associate</option>
          <option value="Career_Break">Career Break</option>
        </select>
      </label>
      <br/>

      <button onClick={handleSubmit}>Submit</button>
      <br />
      </>
  );
};

export default Edit;
