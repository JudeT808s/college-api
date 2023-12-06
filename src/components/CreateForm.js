import axios from 'axios';
import { useState } from 'react';

const CreateForm = ({ onSubmit }) => {
  const errorStyle = {
    color: 'red',
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    title: 'Example',
    code: 'DL821',
    description: 'A course',
    points: '300',
    level: '7',
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
      code: form.code,
      description: form.description,
      points: form.points,
      level: form.level,
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
      Title: <input onChange={handleForm} type="text" name="title" value={form.title} /> <br />
      Code: <input onChange={handleForm} type="text" name="code" value={form.code} /> <br />
      Description: <input onChange={handleForm} type="text" name="description" value={form.description} /> <br />
      Points: <input onChange={handleForm} type="text" name="points" value={form.points} /> <br />
      Level: <input onChange={handleForm} type="text" name="level" value={form.level} /> <br />

      <button onClick={handleClick}>Submit</button>
      <p style={errorStyle}>{errorMessage}</p>
    </>
  );
};

export default CreateForm;
