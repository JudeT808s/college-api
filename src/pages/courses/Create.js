import CreateForm from '../../components/CreateForm'
import axios from 'axios';
import { useState , useEffect} from 'react';
const Create = ({authenticated}) => {
    const [course,setCourse] = useState([])
    useEffect(() => {
        let token = localStorage.getItem('token');
        // Change this to a default domain to simplify soon
        axios.post(`https://college-api.vercel.app/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            setCourse(response.data.data);
            console.log(response.data.data);
          })
          .catch(err => {
            console.log(err);
          });
      }, [authenticated]);
    
    return (
        <>
        <h2>Hi from Create</h2>
        <CreateForm />
        </>
    )
}
export default Create