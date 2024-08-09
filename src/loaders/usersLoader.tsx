/*  2024-08-03 04:45:56


*/

import { UserType } from "@/pages/Users";
import { axiosRequest } from "@/util/axiosInstance";
import { defer } from "react-router-dom";

const usersLoader = () => {
  const usersRequest = async () => {
    const config = { method: "GET" };

    const userResult = await axiosRequest({
      endPoint: "/users",
      config,
    });
    const userData: UserType = userResult?.data;

    return userData;
  };

  return defer({ usersPromise: usersRequest() });
};

export default usersLoader;
