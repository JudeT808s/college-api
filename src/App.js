import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import pages
import CoursesIndex from '../src/pages/courses/Index';
import CoursesShow from '../src/pages/courses/Show';
import CourseCreate from '../src/pages/courses/Create';
import Home from '../src/pages/Home';
// import components
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App =() => {
  let protectedRoutes;
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

  if (authenticated) {
    protectedRoutes = (
      <>
        <Route path="/" element={<CoursesIndex />} />
        <Route path="/courses/:id" element={<CoursesShow />} />
        <Route path="/courses/create" element={<CourseCreate />} />
      </>
    );
  } else {
    // Render the login form when not authenticated
    protectedRoutes = (
      <>
        <Route path="/register" element={<RegisterForm onAuthenticated={onAuthenticated} />} />
        {/* Add a login route */}
        <Route path="/login" element={<LoginForm onAuthenticated={onAuthenticated} />} />
      </>
    );
  }

  return (
    <Router>
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        {protectedRoutes}
      </Routes>
    </Router>
  );
}

export default App;
