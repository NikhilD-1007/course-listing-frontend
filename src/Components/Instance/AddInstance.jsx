import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import './AddInstance.css';

const AddInstance = () => {
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

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

  const handleClose = async () => {
    setYear('');
    setSemester('');
    setCourseId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      yearOfDelivery: year,
      semesterOfDelivery: semester,
    };

    console.log(payload);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/instances/${courseId}`,
        payload
      );
      console.log('Respo ' + response.data);

      if (response.status === 201) {
        console.log(response.data);
        console.log('Instance added successfully');
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card className="fixed-card">
            <Card.Body>
              <Card.Title className="text-center">Add Instance</Card.Title>
              <Row>
                <Col md={12}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCourseId" className="form-group">
                      <Form.Label className="form-label">Course Id:</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                          <option key={course.courseId} value={course.courseId}>
                            {course.courseTitle}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formYear" className="form-group">
                      <Form.Label className="form-label">Year:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Year:"
                        value={year}
                        onChange={(e) => {
                          // Allow only numbers and up to 4 characters
                          if (
                            /^\d*$/.test(e.target.value) &&
                            e.target.value.length <= 4
                          ) {
                            setYear(e.target.value);
                          }
                        }}
                        className="form-control"
                      />
                    </Form.Group>

                    <Form.Group controlId="formSemester" className="form-group">
                      <Form.Label className="form-label">Semester:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Semester"
                        value={semester}
                        onChange={(e) => {
                          // Allow only numbers and up to 2 characters
                          if (
                            /^\d*$/.test(e.target.value) &&
                            e.target.value.length <= 2
                          ) {
                            setSemester(e.target.value);
                          }
                        }}
                        className="form-control"
                      />
                    </Form.Group>

                    <Button type="submit">Add Instance</Button>
                    <Button type="button" onClick={handleClose}>
                      Clear All
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddInstance;
