import axios from 'axios';
import { useState } from 'react';

const RegisterForm = ({ authenticated, onAuthenticated }) => {

    const errorStyle = {
        color: 'red'
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        name: "joe",
        email: "test@test.com",
        password: "Secret123"
    });

    const handleClick = () => {
        console.log("clicked");

        axios.post('https://college-api.vercel.app/register', {
            name: form.name,
            email: form.email,
            password: form.password
        })
            .then(response => {
                console.log(response.data);
                onAuthenticated(true, response.data.token)
            })
            .catch(err => {
                console.error(err)
                setErrorMessage(err.response.data.message)

            })
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    };

    return (
        <>
            Name: <input onChange={handleForm} type="text" name="name" value={form.name} /> <br />
            Email: <input onChange={handleForm} type="text" name="email" value={form.email} /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />

            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
};

export default RegisterForm;