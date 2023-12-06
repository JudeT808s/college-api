import axios from 'axios';
import CreateForm from '../../components/CreateForm';

const Create = ({ authenticated }) => {
  const createCourse = async (formData) => {
    try {
      const token = localStorage.getItem('token');

      // Perform the API call with the form data
      await axios.post(
        'https://college-api.vercel.app/courses',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Handle successful creation
      console.log('Successfully created course');
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <>
      <h2>Hi from Create</h2>
      <CreateForm onSubmit={createCourse} />
    </>
  );
};

export default Create;
