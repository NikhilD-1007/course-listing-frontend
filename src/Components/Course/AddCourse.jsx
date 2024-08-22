import axios from 'axios';
import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

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
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // }
      );
      console.log('Respo ' + response.data);

      if (response.status === 201) {
        console.log(response.data);
        // fetchcategories();
        // handleClose();
        // console.log('Course added successfully', 'success');
        console.log('Course added successfully');
      }
    } catch (error) {
      // triggerMessage('Error, Course not added..', 'error');
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
                    <Form.Group controlId="formCourseTitle">
                      <Form.Label>Course Title:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Title"
                        value={courseTitle}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCourseTitle(value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formCourseCode">
                      <Form.Label>Course Code:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Code"
                        value={courseCode}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCourseCode(value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formCourseDescription">
                      <Form.Label>Course Description:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Course Description"
                        value={courseDescription}
                        onChange={(e) => {
                          setCourseDescription(e.target.value);
                          //   const value = e.target.value;
                          //   if (
                          //     /^[A-Za-z\s]*$/.test(value) &&
                          //     value.length <= 18
                          //   ) {
                          //     setCourseDescription(value);
                          //   } else {
                          //     // Optionally, you could use feedback here
                          //     triggerMessage(
                          //       'Only characters allowed and max length is 18',
                          //       'error'
                          //     );
                          //   }
                        }}
                      />
                    </Form.Group>
                    <button color="primary" type="submit" className="mt-3">
                      Add Course
                    </button>
                    <button
                      //   onClick={handleClose}
                      color="primary"
                      className="mt-3"
                    >
                      Close
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
