import { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/api/v1/employee/")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/employee/${id}`)
      .then(() => {
        toast.success("Employee deleted successfully");
        setEmployees(
          employees.filter((employee) => employee._id !== id.toString())
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee");
      });
  };

  return (
    <Box w="95vw" mx="auto" mt={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text>Total Count: {employees.length}</Text>
        <Link to="/create-employee">
          <Button colorScheme="blue">Create Employee</Button>
        </Link>
      </Flex>
      <Box mb={4}>
        <input type="text" placeholder="Enter Search Keyword" />
        <Button ml={2}>Search</Button>
      </Box>
      <Box>
        <Flex fontWeight="bold" borderBottom="1px solid" py={2}>
          <Box flex="0.5">Unique Id</Box>
          <Box flex="1">Image</Box>
          <Box flex="1">Name</Box>
          <Box flex="1">Email</Box>
          <Box flex="1">Mobile No</Box>
          <Box flex="1">Designation</Box>
          <Box flex="1">Gender</Box>
          <Box flex="1">Course</Box>
          <Box flex="1">Create Date</Box>
          <Box flex="1">Action</Box>
        </Flex>
        {employees.map((employee) => (
          <Flex key={employee.id} borderBottom="1px solid" py={2}>
            {/* <Box flex="0.5">{employee.id}</Box> */}
            <Box flex="1">
              <Image h="70px" src={employee.profilePhoto} />
            </Box>
            <Box flex="1">{employee.fullName}</Box>
            <Box flex="1">{employee.email}</Box>
            <Box flex="1">{employee.phone}</Box>
            <Box flex="1">{employee.designation}</Box>
            <Box flex="1">{employee.gender}</Box>
            <Box flex="1">
              {employee.course.map((course, index) => (
                <Text key={index}>{course}</Text>
              ))}
            </Box>
            <Box flex="1">{formatDate(employee.createdAt)}</Box>
            <Box flex="1">
              <Link to={`/edit-employee/${employee._id}`}>
                <Button size="sm" mr={2} colorScheme="blue">
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(employee._id)}
              >
                Delete
              </Button>
            </Box>
          </Flex>
        ))}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default EmployeeList;
