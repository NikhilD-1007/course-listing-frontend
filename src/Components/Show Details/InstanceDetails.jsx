import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const InstanceDetails = () => {
  const { year, sem, courseId } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instances/${year}/${sem}/${courseId}`
      );
      //   console.log(response.data);

      setCourse(response.data);
      console.log('instance is ' + course);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  useEffect(() => {
    console.log('year: ' + typeof year + ' sem: ' + sem + ' cid: ' + courseId);
    fetchCourseDetails();
  }, [year, sem, courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Course Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Course Id:</strong> {course.courseObj.courseId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course Title:</strong> {course.courseObj.courseTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course Code:</strong> {course.courseObj.courseCode}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course Description:</strong>
              {course.courseObj.courseDesc}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Year:</strong> {course.yearOfDelivery}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Semester:</strong> {course.semesterOfDelivery}
            </ListGroup.Item>
          </ListGroup>

          <Button variant="primary" className="go-back-button" href="/instance">
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstanceDetails;
