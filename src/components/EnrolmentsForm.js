import { useState } from 'react';

const CreateForm = ({ onSubmit }) => {
  const errorStyle = {
    color: 'red',
  };

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
      This is the course create Form
      <label>
        Course ID:
        <input
          type="text"
          name="course_id"
          value={form.course_id}
          onChange={handleForm}
        />
      </label>
      <br />

      <label>
        Lecturer ID:
        <input
          type="text"
          name="lecturer_id"
          value={form.lecturer_id}
          onChange={handleForm}
        />
      </label>
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

      <select id="cars" name="cars">
        {/* Loop through array to get options from axios */}
      <option value="interested">Interested</option>
      <option value="assigned">Assigned</option>
      <option value="associate">Associate</option>
      <option value="career_break">Career_Break</option>

        </select>
<button className="w3-btn w3-black" onClick={handleClick}>Create Course</button>

      <button onClick={handleClick}>Submit</button>
      <p style={errorStyle}>{errorMessage}</p>
    </>
  );
};

export default CreateForm;
