import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Form } from 'react-bootstrap';
import './AddCourse.css'; // Import the CSS file

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleClose = () => {
    setCourseTitle('');
    setCourseCode('');
    setCourseDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      courseTitle: courseTitle,
      courseCode: courseCode,
      courseDesc: courseDescription,
    };

    console.log(payload);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/courses',
        payload
      );
      console.log('Respo ' + response.data);

      if (response.status === 201) {
        console.log(response.data);
        handleClose();
        console.log('Course added successfully');
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
              <Row>
                <Col md={12}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      controlId="formCourseTitle"
                      className="form-group"
                    >
                      <Form.Label className="form-label">
                        Course Title:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formCourseCode"
                      className="form-group"
                    >
                      <Form.Label className="form-label">
                        Course Code:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Code"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formCourseDescription"
                      className="form-group"
                    >
                      <Form.Label className="form-label">
                        Course Description:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Description"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                      />
                    </Form.Group>
                    <button type="submit" className="mt-3">
                      Add Course
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-3"
                    >
                      Clear all
                    </button>
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

export default AddCourse;
