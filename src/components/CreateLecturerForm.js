import { useState, } from 'react';



const CreateForm = ({ onSubmit }) => {
  
  const errorStyle = {
    color: 'red',
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
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
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
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
      <h1>Hi, This is the lecturers create Form</h1>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
      </label>
      <br />

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleForm}
        />
      </label>
      <br />

      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleForm}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
      </label>
      <br />
      

      <button onClick={handleClick}>Submit</button>
      <p style={errorStyle}>{errorMessage}</p>
    </>
  );
};

export default CreateForm;
