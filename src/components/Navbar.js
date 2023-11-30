import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({authenticated, onAuthenticated}) => {
    const navigate = useNavigate();
    const logout = () =>{
        onAuthenticated()
    }
    return (
        
        <>
            <Link to="/">Home</Link>
            {(authenticated)? (<button onClick= {() => onAuthenticated(false)}>Logout</button>) : ""}
        </>
    )
}
export default Navbar