import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ authenticated, onAuthenticated }) => {
  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">Home</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            {(authenticated) ? (
              <ul className="px-5 bg-base-100 rounded-t-none">
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
                <li>
                  <Link to="/courses/create">Create Course</Link>
                  <Link to="/lecturers/create">Create Lecturer</Link>
                  <Link to="/enrolments/create">Create Enrolment</Link>
                </li>
              </ul>
            ) : ""}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
