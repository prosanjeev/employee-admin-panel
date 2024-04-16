import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../..";
import axios from "axios";
import { toast } from "react-toastify";
import { setAuthUser } from "../../redux/userSlice";

const TopNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box px="4" bg="#2A3542">
      <HStack
        maxW="80rem"
        h="16"
        justify="space-between"
        mx="auto"
        color="white"
        fontWeight="600"
        fontSize="18px"
      >
        <Flex gap={20}>
          <Link to="/">
            {" "}
            <Text cursor="pointer">Home</Text>
          </Link>
          <Link to="/employees">
            {" "}
            <Text cursor="pointer">Employee List</Text>
          </Link>
        </Flex>
        <Flex gap={10} align="center">
          <Box border="1px solid gray" borderRadius="10" p={2}>
            {" "}
            <Text fontWeight="400" cursor="pointer">
              {authUser.fullName}
            </Text>
          </Box>
          <Text cursor="pointer" onClick={logoutHandler}>
            Logout
          </Text>
        </Flex>
      </HStack>
    </Box>
  );
};

export default TopNav;
