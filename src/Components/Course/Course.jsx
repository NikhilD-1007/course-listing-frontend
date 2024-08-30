import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './Course.css';
import { Link } from 'react-router-dom';

const Course = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (cid) => {
    console.log('cid' + cid);

    try {
      const resoponse = await axios.delete(
        `http://localhost:8080/api/courses/${cid}`
      );

      if (resoponse.status === 200) {
        fetchCourses();
        console.log('Deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting courses:', error);
    }
  };

  const handleShowCourse = async (id) => {
    console.log('id ' + id);
    try {
      const resoponse = await axios.get(
        `http://localhost:8080/api/courses/${id}`
      );

      console.log(resoponse.data);

      if (resoponse.status === 200) {
        fetchCourses();
        console.log('Course details show successfully');
      }
    } catch (error) {
      console.error('Error For show course details:', error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card className="mt-2 scrollable-card">
            <Card.Body>
              <Card.Title className="text-center">All Courses</Card.Title>
              <div className="table-container">
                {courses.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Course Title</th>
                        <th>Course Code</th>
                        <th style={{ textAlign: 'center' }} colSpan={2}>
                          ACTION BUTTON
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item) => (
                        <tr key={item.courseId} className="TableRowInCategory">
                          <td>{item.courseId}</td>
                          <td>{item.courseTitle}</td>
                          <td>{item.courseCode}</td>

                          <td>
                            <Button
                              onClick={() => handleDeleteCourse(item.courseId)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </Button>
                          </td>
                          {/* <td>
                            <Button
                              onClick={() => handleShowCourse(item.courseId)}
                            >
                              <i className="bi bi-search"></i>
                            </Button>
                          </td> */}
                          <td>
                            <Link to={`/courses/${item.courseId}`}>
                              <Button variant="info">
                                <i className="bi bi-search"></i>
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h2>No Courses Found</h2>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Course;
