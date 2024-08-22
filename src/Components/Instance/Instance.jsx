import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Instance = () => {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [courseById, setCourseById] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/instances');
      setInstances(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //@DeleteMapping("/{year}/{sem}/{courseId}")
  const handleDeleteInstance = async (year, sem, cId) => {
    console.log('year: ' + typeof year + ' sem: ' + sem + ' cid: ' + cId);

    console.log(`http://localhost:8080/api/instances/${year}/${sem}/${cId}`);

    try {
      const resoponse = await axios.delete(
        `http://localhost:8080/api/instances/${year}/${sem}/${cId}`
      );

      if (resoponse.status === 200) {
        // fetchCourses();
        console.log('Deleted successfully');
        fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting instance:', error);
    }
  };

  const handleShowInstance = async (year, sem, courseId) => {
    console.log('year: ' + year + ' sem: ' + sem + ' cid: ' + courseId);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/instances/${year}/${sem}/${courseId}`
      );
      console.log(response.data);

      setCourseById(response.data);
      console.log('course is ' + courseById);

      if (response.status === 200) {
        // fetchCourses();
        console.log(response.data);

        console.log('Show instance successfully');
      }
    } catch (error) {
      console.error('Error for show instance:', error);
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
                {instances.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Course Title</th>
                        <th>Year-Sem</th>
                        <th>Course Code</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instances.map((item) => (
                        <tr
                          key={item.courseDeliveryId}
                          className="TableRowInCourses"
                        >
                          <td>{item.courseDeliveryId}</td>
                          <td>{item.courseObj.courseTitle}</td>
                          <td>
                            {item.yearOfDelivery}-{item.semesterOfDelivery}
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                handleDeleteInstance(
                                  item.yearOfDelivery,
                                  item.semesterOfDelivery,
                                  item.courseObj.courseId
                                )
                              }
                            >
                              <i className="bi bi-trash-fill"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                handleShowInstance(
                                  item.yearOfDelivery,
                                  item.semesterOfDelivery,
                                  item.courseObj.courseId
                                )
                              }
                            >
                              <i className="bi bi-search"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h2>No Instances Found</h2>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Instance;
