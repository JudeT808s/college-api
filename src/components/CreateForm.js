import axios from 'axios';
import { useState } from 'react';
// import input from './input';
import { useForm, FormProvider } from 'react-hook-form';

import { Button } from 'react-daisyui';


// const CreateForm = ({ onSubmit }) => {
  const CreateForm = ({ onSubmit }) => {
      const errorStyle = {
    color: 'red'
};
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    code: '',
    description: '',
    points: '',
    level: '',
  });
  const methods = useForm()

 
  const handleFormChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  
  const isRequired = (fields) => {
    let included = true;
    setErrors({});
  
    Object.keys(fields).forEach((field) => {
      if (!fields[field]) {
        included = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${field} is required!`,
        }));
      }
    });
  
    return included;
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log('submitted', form);
    if (isRequired(form)) {
      onSubmit(form);
    }
  };

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)} className="container mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Course Create Form</h1>

      {Object.keys(form).map((field) => (
        <div key={field}>
          <label name={field} />
          <input
            name={field}
            onChange={handleFormChange}
            type={field === 'points' ? 'number' : 'text'}
            placeholder={`Please enter ${field}`}
            className={errors[field] ? 'border-red-500' : ''}
          />
          <span style={errorStyle}>{errors[field]}</span>
        </div>
      ))}

      <Button type="button" onClick={handleClick} className="btn-primary">
        Submit
      </Button>
    </form>
  </FormProvider>
  );
};

export default CreateForm;
