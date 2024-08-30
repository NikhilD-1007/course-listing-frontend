import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Course from './Components/Course/Course';
import AddCourse from './Components/Course/AddCourse';
import Instance from './Components/Instance/Instance';
import AddInstance from './Components/Instance/AddInstance';
import SideNavBar from './Components/Home/SideNavBar';
import { useState } from 'react';
import axios from 'axios';
import InstanceDetails from './Components/Show Details/InstanceDetails';
import CourseDetails from './Components/Show Details/CourseDetails';

function App() {
  const [showDetailss, setShowDetailss] = useState({
    semesterOfDelivery: '',
    yearOfDelivery: '',
    courseObj: {},
  });

  const handleShowInstance = async (year, sem, courseId) => {
    console.log('year: ' + year + ' sem: ' + sem + ' cid: ' + courseId);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/instances/${year}/${sem}/${courseId}`
      );

      if (response.status === 200) {
        console.log(response.data.semesterOfDelivery);
        setShowDetailss({
          semesterOfDelivery: response.data.semesterOfDelivery,
          yearOfDelivery: response.data.yearOfDelivery,
          courseObj: response.data.courseObj,
        });
        console.log('Show instance successfully');
      }
    } catch (error) {
      console.error('Error showing instance:', error);
    }
  };

  return (
    <>
      <Router>
        <SideNavBar />
        <div>
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route
              path="/instance"
              element={<Instance handleShowInstance={handleShowInstance} />}
            />
            <Route path="/addinstance" element={<AddInstance />} />
            <Route path="/course" element={<Course />} />

            <Route
              path="/instance/:year/:sem/:courseId"
              element={<InstanceDetails />}
            />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
