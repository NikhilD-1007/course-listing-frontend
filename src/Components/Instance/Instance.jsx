import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button } from 'react-bootstrap';
import './Instance.css';
import { Link } from 'react-router-dom';

const Instance = ({ handleShowInstance }) => {
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

  const handleDeleteInstance = async (year, sem, cId) => {
    console.log('year: ' + typeof year + ' sem: ' + sem + ' cid: ' + cId);

    console.log(`http://localhost:8080/api/instances/${year}/${sem}/${cId}`);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/instances/${year}/${sem}/${cId}`
      );

      if (response.status === 200) {
        console.log('Deleted successfully');
        fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting instance:', error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card className="scrollable-card">
            <Card.Body>
              <Card.Title className="text-center">All Instances</Card.Title>
              <div className="table-container">
                {instances.length > 0 ? (
                  <Table striped bordered hover className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Course Title</th>
                        <th>Year-Sem</th>
                        <th style={{ textAlign: 'center' }} colSpan={2}>
                          ACTION
                        </th>
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
                          {/* <td>
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
                          </td> */}
                          <td>
                            <Link
                              to={`/instance/${item.yearOfDelivery}/${item.semesterOfDelivery}/${item.courseObj.courseId}`}
                            >
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
