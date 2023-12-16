import axios from 'axios';
import { useState } from 'react';
import Input from './Input';
import {useForm, FormProvider } from 'react-hook-form'

// const CreateForm = ({ onSubmit }) => {
const CreateForm = ({  }) => {
  const errorStyle = {
    color: 'red'
};
  const [errors, setErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    // title: 'Example',
    // code: 'DL821',
    // description: 'A course',
    // points: '300',
    // level: '7',
  });
  const methods = useForm()

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.label]: e.target.value,
    }));
  };
  
  // const handleClick = () => {
  //   console.log('clicked');
  //   console.log({
  //     title: form.title,
  //     code: form.code,
  //     description: form.description,
  //     points: form.points,
  //     level: form.level,
  //   });
  //   // Pass the form data to the onSubmit prop
  //   // onSubmit(form);
  // };
  const isRequired = (fields) => {

    let included = true;
    setErrors({});

    fields.forEach(field => {

        if(!form[field]){
            included = false;
            setErrors(prevState => ({
                ...prevState,
                [field]: {
                    message: `${field} is required!`
                }
            }));
        }
        
    });

    return included;
};
  const submitForm = (e) => {
    e.preventDefault();
    console.log('submitted', form);
    // ifIsRequired
    onSubmit(form);
  };
  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
  })
  return (
    <FormProvider {...methods}>

    <form
    onSubmit={e => e.preventDefault()}
    noValidate
      className="container"
    >
      This is the course create Form
      <div>
       <input
        label="title"
        onChange={handleForm}
        type="text"
        placeholder="please enter a title"
          value={form.title} />
        <span style={errorStyle}>{errors.title?.message}</span><br />
        </div>
        <div>
       <input
      label="code"    
        onChange={handleForm}
        type="text"
        placeholder="please enter a code"
        value={form.code}/>
        <span style={errorStyle}>{errors.code?.message}</span>
       <br />
      </div>
      <div>
      <input
      label="description"   
        onChange={handleForm}
        type="text"
        placeholder="please enter a description"
        value={form.description}/>
        <span style={errorStyle}>{errors.description?.message}</span>
       <br />
      </div>
      <div>
      <input
      label="points"   
        onChange={handleForm}
        type="text"
        value={form.points}
        placeholder="please enter points"

      /> <br />
        </div>
        <div>
      <input
      label="level"   
        onChange={handleForm}
        type="text"
        placeholder="please enter a level"
        value={form.level}/>
        <span style={errorStyle}>{errors.level?.message}</span>
       <br />
      </div>
      <button onClick={onSubmit}>Submit</button>
      {/* <button onClick={handleClick}>Submit</button> */}
      {/* <p style={errorStyle}>{errorMessage}</p> */}
      </form>
      </FormProvider>
  );
};

export default CreateForm;
