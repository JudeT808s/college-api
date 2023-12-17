import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <p>&copy; IADT, Institute of Art, Design and Technology. All rights reserved.</p>
                <p className="flex items-center">
                    <ul>
                        <li><Link to="/courses">View Course</Link></li>
                        <li><Link to="/lecturers">View Lecturers</Link></li>
                        <li><Link to="/enrolments">View Enrolments</Link></li>
                    </ul>
                </p>

            </div>

        </footer>
    );
};

export default Footer;
