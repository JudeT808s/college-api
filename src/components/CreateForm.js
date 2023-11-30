import axios from 'axios';
import { useState } from 'react';

const CreateForm = ({ authenticated, onAuthenticated }) => {

    const errorStyle = {
        color: 'red'
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        title: "Example",
        code: "DL821",
        description: "A course",
        points: "300",
        level: "7",
    });

    // const handleClick = () => {
    //     console.log("clicked");

    //     axios.post('https://college-api.vercel.app/courses', {
    //         title: form.title,
    //         code: form.code,
    //         description: form.description,
    //         points: form.points,
    //         level: form.level,
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             onAuthenticated(true, response.data.token)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             setErrorMessage(err.response.data.message)

    //         })
    // };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted" ,form)
        ifisRequired
    }

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    };

    return (
        <>
          This is the course create Form
            Title: <input onChange={handleForm} type="text" name="title" value={form.title} /> <br />
            Code: <input onChange={handleForm} type="text" name="code" value={form.code} /> <br />
            Description: <input onChange={handleForm} type="text" name="description" value={form.description} /> <br />
            Points: <input onChange={handleForm} type="text" name="points" value={form.points} /> <br />
            {/* Change to dropdown pref using map to go through min and max level */}
            Level: <input onChange={handleForm} type="text" name="level" value={form.level} /> <br />

            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
};

export default CreateForm;