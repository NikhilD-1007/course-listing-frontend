import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Course from './Components/Course/Course';
import AddCourse from './Components/Course/AddCourse';
import Instance from './Components/Instance/Instance';
import AddInstance from './Components/Instance/AddInstance';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/instance" element={<Instance />} />
            <Route path="/addinstance" element={<AddInstance />} />
            <Route path="/course" element={<Course />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
