import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-daisyui';

const CreateForm = ({ onSubmit }) => {
  const [coursesList, setCoursesList] = useState([]);
  const [lecturersList, setLecturersList] = useState([]);
  const token = localStorage.getItem('token');
  const errorStyle = {
    color: 'red',
  };

  useEffect(() => {
    axios.get(`https://college-api.vercel.app/courses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCoursesList(response.data.data);
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
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  const [form, setForm] = useState({
    date: '',
    time: '',
    course_id: '',
    lecturer_id: '',
    status: 'Interested',
  });
  const [course_id, setCourseId] = useState('');

  const handleForm = (e) => {
    const { name, value } = e.target;

  
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleClick = () => {
    console.log('clicked');
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
    <div className='container mx-auto max-w-md space-y-4">'>
            <h1 className="text-2xl font-semibold">Create Enrolments Form</h1>

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

      <Button type='button' onClick={handleClick} className='btn-primary'>Submit</Button>
      {/* Display any error messages */}
      <p style={errorStyle}>{/* Error messages go here */}</p>
      <br />
    </div>
  );
};

export default CreateForm;
