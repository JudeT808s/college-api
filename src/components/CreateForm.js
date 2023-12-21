import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'react-daisyui';

const CreateForm = ({ onSubmit, isEdit, id }) => {
  const token = localStorage.getItem('token');

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
  const methods = useForm();

  useEffect(() => {
    // If in edit mode and editData is available, initialize form state with editData
    if (isEdit) {
      // Fetch course data based on the provided course id
      axios.get(`https://college-api.vercel.app/lecturers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const { created_at, updated_at, enrolments, ...editableData } = response.data.data;
        setForm(editableData);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [isEdit, id, token]);



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
    if (isRequired(form)) {
      onSubmit(form);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleClick)} className="container mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Course Form</h1>

        {Object.keys(form).map((field) => {
          // Exclude created_at and updated_at from being editable
          if (field !== 'created_at' && field !== 'updated_at' && field !== 'enrolments' ) {
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  name={field}
                  onChange={handleFormChange}
                  value={form[field]}
                  type={field === 'points' || field === 'level' ? 'number' : 'text'}
                  placeholder={`Please enter ${field}`}
                  className={errors[field] ? 'border-red-500' : ''}
                />
                <span style={errorStyle}>{errors[field]}</span>
              </div>
            );
          }
          return null;
        })}

        <Button type="button" onClick={handleClick} className="btn-primary">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateForm;
