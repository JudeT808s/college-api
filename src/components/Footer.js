import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <p>&copy; IADT, Institute of Art, Design and Technology. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/courses" className="text-gray-300 hover:text-white">
                View Courses
              </Link>
            </li>
            <li>
              <Link to="/lecturers" className="text-gray-300 hover:text-white">
                View Lecturers
              </Link>
            </li>
            <li>
              <Link to="/enrolments" className="text-gray-300 hover:text-white">
                View Enrolments
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
