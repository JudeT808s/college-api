import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ authenticated, onAuthenticated }) => {
  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start gap-1">
        <Link to="/" className="text-2xl font-bold">College</Link>
        <details className="dropdown">
  <summary className="m-1 btn gap-1">Explore Here</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
  <li><Link to="/courses">View Course</Link></li>
  <li><Link to="/lecturers">View Lecturers</Link></li>
  <li><Link to="/enrolments">View Enrolments</Link></li>
  </ul>
</details>
      </div>
      <div className="navbar-center hidden lg:flex">

        {authenticated && (
    <ul className="menu menu-horizontal px-1">
   
      
      <li>
        <Link to="/courses/create">Create Course</Link>
      </li>
      <li>
        <Link to="/lecturers/create">Create Lecturer</Link>
      </li>
      <li>
        <Link to="/enrolments/create">Create Enrolment</Link>
            </li>
            <li>
          <button onClick={logout}>Logout</button>
        </li>
          </ul>
        )}
        </div>
     
  </div>
  
      
  
    // <div className="navbar bg-base-100 p-2">
    //   <div className="flex-1">
    //     <Link to="/">Home</Link>
    //   </div>
    //   <div className="flex-none">
    //     <ul className="menu menu-horizontal">
    //       <li>
    //         <a href="/">Link</a>
    //       </li>
    //       {authenticated && (
    //         <li className="relative">
    //           <a>Account</a>
    //           <ul className="menu menu-box py-2 w-40">
    //             <li>
    //               <Link to="/courses/create">Create Course</Link>
    //             </li>
    //             <li>
    //               <Link to="/lecturers/create">Create Lecturer</Link>
    //             </li>
    //             <li>
    //               <Link to="/enrolments/create">Create Enrolment</Link>
    //             </li>
    //             <li className="divider"></li>
    //             <li>
    //               <button onClick={logout}>Logout</button>
    //             </li>
    //           </ul>
    //         </li>
    //       )}
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Navbar;
