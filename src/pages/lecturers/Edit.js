import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from '../../components/CreateLecturerForm';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const editLecturer = async (editData) => {

  let token = localStorage.getItem('token');

  try {

      // Fetch lecturer data based on the provided course id
      const response = await axios.put(
        (`https://college-api.vercel.app/lecturers/${id}`,
        editData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
    console.log('Lecturer updated:', response.data);

  } catch (error) {
    console.error('Error updating course:', error);
  }
    };

  return (
    <div>
    <h3>Edit Course {id}</h3>
    <CreateForm isEdit={true} onSubmit={editLecturer} id={id} />
  </div>
  );
};

export default Edit;
