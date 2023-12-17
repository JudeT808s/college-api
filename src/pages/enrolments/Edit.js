import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { set } from 'react-hook-form';
import { Button } from 'react-daisyui';

const Edit = () => {
  const { id } = useParams();
  const [coursesList, setCoursesList] = useState([]);
  const [lecturersList, setLecturersList] = useState([]);
  const [form, setForm] = useState({
    course_id: '',
    lecturer_id: '',
    date: '',
    time: '',
    status: 'interested',
  });

  let token = localStorage.getItem('token');


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
  const handleForm = (e) => {
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
      console.log(form);
    }
  };


  return (
    <div className="container mx-auto max-w-md space-y-4">
      {/* This is the enrolments create Form */}
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleForm}
        />
      </label>
      <br />

      <label>
        Time:
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleForm}
        />
      </label>
      <br />
      <label> Course:
        <select id="course" name="course_id" onChange={handleForm} value={form.course_id}>
          {coursesList.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </label>

      <br />
      <label> Lecturer:
        <select id="lecturer" name="lecturer_id" onChange={handleForm} value={form.lecturer_id}>
          {lecturersList.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>
              {lecturer.name}
            </option>
          ))}
        </select>
      </label>

      <br />
      <label>
        Status:
        <select id="status" name="status" onChange={handleForm} value={form.status}>
          <option value="interested">Interested</option>
          <option value="assigned">Assigned</option>
          <option value="associate">Associate</option>
          <option value="career_break">Career Break</option>
        </select>
      </label>
      <br />

      <Button type="button" onClick={handleSubmit} className="btn-primary">
        Submit
      </Button>
      <br />
    </div>
  );
};

export default Edit;
