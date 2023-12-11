import axios from 'axios';
import { useState } from 'react';

const LoginForm = ({ authenticated, onAuthenticated }) => {

    const errorStyle = {
        color: 'red'
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        email: "sam@bloggs.com",
        password: "secret"
    });

    const handleClick = () => {
        console.log("clicked");

        axios.post('https://college-api.vercel.app/login', {
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
            This is login Form
            Email: <input onChange={handleForm} type="text" name="email" value={form.email} /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />

            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
};

export default LoginForm;