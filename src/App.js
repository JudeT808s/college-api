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
// Import essential components
import Home from '../src/pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// Enrolments
import EnrolmentsIndex from '../src/pages/enrolments/Index';
import EnrolmentsShow from '../src/pages/enrolments/Show';
import EnrolmentsCreate from '../src/pages/enrolments/Create';
import EnrolmentsEdit from '../src/pages/enrolments/Edit';

// ... (imports)

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Define common routes for protected components
  const protectedRoutes = (
    <>
      <Route path="/courses/create" element={<CoursesCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/courses/edit/:id" element={<CoursesEdit onAuthenticated={onAuthenticated} />} />
      <Route path="/lecturers/create" element={<LecturersCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/lecturers/edit/:id" element={<LecturersEdit onAuthenticated={onAuthenticated} />} />
      <Route path="/enrolments/create" element={<EnrolmentsCreate onAuthenticated={onAuthenticated} />} />
      <Route path="/enrolment/edit/:id" element={<EnrolmentsEdit onAuthenticated={onAuthenticated} />} />
    </>
  );

  return (
    <Router>
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />

      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/courses/" element={<CoursesIndex onAuthenticated={onAuthenticated} />} />
        <Route path="/course/:id" element={<CoursesShow onAuthenticated={onAuthenticated} />} />
        <Route path="/lecturer/:id" element={<LecturersShow onAuthenticated={onAuthenticated} />} />
        <Route path="/lecturers" element={<LecturersIndex />} />
        {authenticated && protectedRoutes}
        <Route path="/enrolments" element={<EnrolmentsIndex  onAuthenticated={onAuthenticated} />} />
        <Route path="/enrolment/:id" element={<EnrolmentsShow onAuthenticated={onAuthenticated} />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

