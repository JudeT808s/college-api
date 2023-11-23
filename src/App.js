import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CoursesIndex from '../src/pages/courses/Index'
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<CoursesIndex />}/>
      </Routes>
      </Router>
  );
}

export default App;
