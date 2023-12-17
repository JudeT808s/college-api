import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateForm from '../../components/CreateForm';

const Edit = () => {
  const { id } = useParams();

  const editCourse = async (editData) => {
    try {
      const token = localStorage.getItem('token');

      // Make a PUT request to update the course data
      const response = await axios.put(
        `https://college-api.vercel.app/courses/${id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Course updated:', response.data);

    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h3>Edit Course {id}</h3>
      <CreateForm isEdit={true} onSubmit={editCourse} id={id} />
    </div>
  );
};

export default Edit;
