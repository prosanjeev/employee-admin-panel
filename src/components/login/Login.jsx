import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../..";
import { setAuthUser } from "../../redux/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${BASE_URL}/api/v1/user/login`, values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        navigate("/");
        dispatch(setAuthUser(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    },
  });

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Box
          p={10}
          rounded="lg"
          shadow="md"
          bgClip="padding-box"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Login
          </Text>
          <form onSubmit={formik.handleSubmit} action="">
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Username"
                  isInvalid={formik.touched.username && formik.errors.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.username}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  type="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue" size="sm" isFullWidth>
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
