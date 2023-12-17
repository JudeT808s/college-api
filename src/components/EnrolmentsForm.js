import { useState, useEffect } from 'react';
import axios from 'axios';
const CreateForm = ({ onSubmit }) => {
  const [coursesList, setCoursesList] = useState([]);
  const [lecturersList, setLecturersList] = useState([]);
  let token = localStorage.getItem('token');
  let lecturers = [];
  const errorStyle = {
    color: 'red',
  };

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
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    Status: 'Interested',
  });

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    console.log('clicked');
    console.log({
      title: form.title,

    });
    // Pass the form data to the onSubmit prop
    onSubmit(form);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submitted', form);
    // ifIsRequired
    onSubmit(form);
  };

  return (
    <>
      This is the enrolments create Form
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
        <select id="status" name="Status" onChange={handleForm} value={form.Status}>
          <option value="Interested">Interested</option>
          <option value="Assigned">Assigned</option>
          <option value="Associate">Associate</option>
          <option value="Career_Break">Career Break</option>
        </select>
      </label>
      <br/>

      <button onClick={handleClick}>Submit</button>
      <p style={errorStyle}>{errorMessage}</p>
      <br />
      </>
  );
};

export default CreateForm;
