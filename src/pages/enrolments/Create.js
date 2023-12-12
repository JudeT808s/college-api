import axios from 'axios';
import CreateForm from '../../components/EnrolmentsForm';

const Create = ({ authenticated }) => {
  const createEnrolment = async (formData) => {
    try {
      const token = localStorage.getItem('token');

      // Perform the API call with the form data
      await axios.post(
        'https://college-api.vercel.app/enrolments',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Handle successful creation
      console.log('Successfully created Enrolment');
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <>
      <h2>Hi from Create</h2>
      <CreateForm onSubmit={createEnrolment} />
    </>
  );
};

export default Create;
