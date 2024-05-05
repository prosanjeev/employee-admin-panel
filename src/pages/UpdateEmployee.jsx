import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { employeeInformation } from "./data";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployee = ({ match }) => {
  const [employeePhoto, setEmployeePhoto] = useState("");
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchEmployee(id);
  }, [id]);

  function convertToBase64(e){
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setEmployeePhoto(reader.result);
    };
    reader.onerror = error =>{
        console.log("Error", error)
    }
  }

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/employee/${id}`
      );
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const onSubmit = async (values) => {
    console.log("vall",values)
    try {
      if(employeePhoto !== ""){
        values.profilePhoto=employeePhoto
      }
      const response = await axios.put(
        `http://localhost:8080/api/v1/employee/${employee._id}`,
        values
      );
      console.log("response",response);
      if (response.status === 200) {
        // toast.success("Employee updated successfully");
    } else {
        toast.error("Failed to update employee");
    }
      navigate("/employees"); // Redirect to employees page after updating
    } catch (error) {
      console.error("Error updating employee:", error.response.data.message);
      // toast.error(error.response.data.message);
    }
  };

  return (
    <Box title="Update Employee">
      {employee && (
        <Center>
          <Card
            my={6}
            py={6}
            borderRadius="16px"
            minW={{
              base: "90vw",
              md: "100vw",
              lg: "1000px",
            }}
            fontFamily="Philosopher"
          >
            <Box
              bgColor="green"
              w="400px"
              p="12px 16px"
              borderRadius="0 50px 50px 0"
            >
              <Text color="white" textStyle="h1">
                Update Employee
              </Text>
            </Box>

            <Formik
              initialValues={{
                fullName: employee.fullName,
                email: employee.email,
                phone: employee.phone,
                designation: employee.designation,
                gender: employee.gender,
                course: employee.course,
              }}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Stack mt={10} spacing={6}>
                    <SimpleGrid columns={1} px={7} columnGap={4} rowGap={4}>
                      {/* Employee Information Fields */}
                      {employeeInformation.map((list, index) => (
                        <Field name={list.name} key={index}>
                          {({ field, meta }) => (
                            <FormControl isInvalid={meta.error && meta.touched}>
                              <FormLabel htmlFor={list.name} fontWeight="600">
                                {list.label}
                              </FormLabel>
                              {list.type === "select" ? (
                                <Select
                                  name={list.name}
                                  {...field}
                                  onChange={(e) =>
                                    setFieldValue(list.name, e.target.value)
                                  }
                                  placeholder={list.placeholder}
                                >
                                  {list.options.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Select>
                              ) :  list.type === "radio" ? (
                                <Stack direction="row">
                                  {list.options.map((option) => (
                                    <Box key={option}>
                                      <input
                                        type="radio"
                                        id={option}
                                        name={list.name}
                                        value={option}
                                        checked={field.value === option}
                                        onChange={() =>
                                          setFieldValue(list.name, option)
                                        }
                                      />
                                      <label htmlFor={option}>{option}</label>
                                    </Box>
                                  ))}
                                </Stack>
                              ): list.type === "checkbox" ? (
                                <Stack direction="row">
                                  {list.options.map((option) => (
                                    <Box key={option}>
                                      <input
                                        type="checkbox"
                                        id={option}
                                        name={list.name}
                                        value={option}
                                        checked={values.course.includes(option)}
                                        onChange={(e) => {
                                          const option = e.target.value;
                                          let newValue;
                                          if (e.target.checked) {
                                            // Add the course to the array if it's not already present
                                            newValue = [...values.course, option];
                                          } else {
                                            // Remove the course from the array if it's present
                                            newValue = values.course.filter((item) => item !== option);
                                          }
                                          // Set the new value for the course field
                                          setFieldValue(list.name, newValue);
                                        }}
                                      />
                                      <label htmlFor={option}>{option}</label>
                                    </Box>
                                  ))}
                                </Stack>
                              ) : (
                                <>
                                  {list.name === "profilePhoto" ? (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={convertToBase64}
                                    
                                    />
                                  ) : (
                                    <Input
                                      bgColor="black.5"
                                      name={list.name}
                                      type={list.type}
                                      placeholder={list.placeholder}
                                      readOnly={list.readOnly}
                                      {...field}
                                    />
                                  )}
                                </>
                              )}
                              <FormErrorMessage>{meta.error}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      ))}
                    </SimpleGrid>

                    {/* Submit Button */}
                    <Button
                      leftIcon={<MdKeyboardDoubleArrowRight />}
                      m="10px 50px"
                      size="md"
                      type="submit"
                    >
                      Update Employee
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
      )}
    </Box>
  );
};

export default UpdateEmployee;
