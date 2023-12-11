// Import the necessary modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CoursesIndex from '../src/pages/courses/Index';
import CoursesShow from '../src/pages/courses/Show';
import CoursesCreate from '../src/pages/courses/Create';
import CoursesEdit from '../src/pages/courses/Edit';

//Lecturers
import LecturersIndex from '../src/pages/lecturers/Index';
import LecturersShow from '../src/pages/lecturers/Show';
import LecturersCreate from '../src/pages/lecturers/Create';
import LecturersEdit from '../src/pages/lecturers/Edit';
// Renamed to CoursesCreate
// Import courses
import Home from '../src/pages/Home';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

// 
import EnrolmentsIndex from '../src/pages/enrolments/Index';
import EnrolmentsShow from '../src/pages/enrolments/Show';
import EnrolmentsCreate from '../src/pages/enrolments/Create';
import EnrolmentsEdit from '../src/pages/enrolments/Edit';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated on component mount
    if (localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    // Handle authentication status and token storage
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Define protected routes based on authentication status
  const protectedRoutes = authenticated ? (
    <>
      <Route path="/" element={<CoursesIndex />} />
      <Route path="/courses/create" element={<CoursesCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/courses/edit/:id" element={<CoursesEdit onAuthenticated={onAuthenticated} />} />
      <Route path="/lecturers/create" element={<LecturersCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/lecturers/edit/:id" element={<LecturersEdit onAuthenticated={onAuthenticated} />} />
      <Route path="/enrolments/create" element={<EnrolmentsCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/lecturers/edit/:id" element={<EnrolmentsEdit onAuthenticated={onAuthenticated} />} />
     
    </>
  ) : (
    <>
      <Route path="/register" element={<RegisterForm onAuthenticated={onAuthenticated} />} />
      <Route path="/login" element={<LoginForm onAuthenticated={onAuthenticated} />} />
    </>
  );

  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />

      {/* Routes for different components */}
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/course/:id" element={<CoursesShow onAuthenticated={onAuthenticated} />} />
        <Route path="/lecturer/:id" element={<LecturersShow onAuthenticated={onAuthenticated} />} />
        <Route path="/lecturers" element={<LecturersIndex />} />
        {protectedRoutes}
        <Route path="/enrolments" element={<EnrolmentsIndex authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/enrolments/:id" element={<EnrolmentsShow onAuthenticated={onAuthenticated} />} />
        {protectedRoutes}
      </Routes>
    </Router>
  );
};

export default App;
