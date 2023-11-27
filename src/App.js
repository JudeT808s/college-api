import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import pages
import CoursesIndex from '../src/pages/courses/Index'
//import components
import LoginForm from './components/LoginForm';
function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<CoursesIndex />} />
        {/* //Change this to the default path later */}
      <Route path="/login" element={<LoginForm />}/>
      </Routes>
      </Router>
  );
}

export default App;
