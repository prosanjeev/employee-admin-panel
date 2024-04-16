import React, { useEffect, useState } from "react";
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
import { object, string, number } from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const employeeValidationSchema = object({
  name: string().required("Name is Required"),
  email: string().email().required("Email is Required"),
  phone: string()
    .required("Mobile No. is Required")
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits"),
  designation: string().required("Designation is Required"),
  gender: string().required("Gender is Required"),
  course: string().required("Course is Required"),
});

const CreateEmployee = () => {
  const [employeePhoto, setEmployeePhoto] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("employeePhoto",employeePhoto);
  }, [employeePhoto]);



  console.log()
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

  const employeeInformation = [
    {
      label: "Name",
      name: "fullName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Mobile No",
      name: "phone",
      type: "number",
    },
    {
      label: "Designation",
      name: "designation",
      type: "select",
      options: ["HR", "Manager", "Sales"],
      placeholder: "Select Designation",
    },
    {
      label: "Gender",
      name: "gender",
      type: "radio",
      options: ["male", "female"],
    },
    {
      label: "Course",
      name: "course",
      type: "radio",
      options: ["MCA", "BCA", "BSC"],
    },
    {
      label: "Employee Photo",
      name: "profilePhoto",
      type: "file",
    },
  ];

  const onSubmit = async (values, actions) => {
    console.log("Form Submitted with values:", values); // Add this line

    try {
        values.profilePhoto=employeePhoto
        console.log("vall",values)
      const response = await axios.post(
        "http://localhost:8080/api/v1/employee/create",
        values
      );
      if (response.status === 201) {
        toast.success("Employee created successfully");
        actions.resetForm();
        navigate("/");
      } else {
        toast.error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    //   toast.error("An error occurred while creating employee");
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {/* Font import */}
      <Box title="Add Course">
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
                Create Employee
              </Text>
            </Box>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                designation: "",
                gender: "",
                course: "",
                profilePhoto: null,
              }}
           
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Stack mt={10} spacing={6}>
                    <SimpleGrid columns={1} px={7} columnGap={4} rowGap={4}>
                      {employeeInformation.map((list, index) => (
                        <Field name={list.name} key={index}>
                          {({ field, meta }) => (
                            <FormControl isInvalid={meta.error && meta.touched}>
                              <FormLabel htmlFor={list.name} fontWeight="600">
                                {list.label}
                              </FormLabel>
                              {list.type === "select" ? (
                                <Select
                                  bgColor="black.5"
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
                              ) : list.type === "radio" ? (
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

                    <Button
                      leftIcon={<MdKeyboardDoubleArrowRight />}
                      m="10px 50px"
                      size="md"
                      type="submit"
                    >
                      Add New Employee
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
      </Box>
    </>
  );
};

export default CreateEmployee;
