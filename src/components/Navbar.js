import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ authenticated, onAuthenticated }) => {
    const navigate = useNavigate();
    const logout = () => {
        onAuthenticated()
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/">Home</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Link</a></li>
                        <li>
                            <details>
                                <summary>
                                    Parent
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    {(authenticated) ? (<button onClick={() => onAuthenticated(false)}>Logout</button>) : ""}
                                    <Link to="/courses/create">Create</Link>
                                    {(authenticated) ? (<button onClick={() => onAuthenticated(false)}>Create</button>) : ""}
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Navbar