import { PostType } from "@/pages/Posts";
import { UserType } from "@/pages/Users";
import { axiosRequest } from "@/util/axiosInstance";
import { defer, LoaderFunctionArgs } from "react-router-dom";

// type UserLoaderDataType = {
//     user: UserType;
//     posts: PostType[];
//   };

const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const userRequest = async () => {
    const config = { method: "GET" };

    const userResult = await axiosRequest({
      endPoint: `/users/${params.userId}`,
      config,
    });
    const userData: UserType = userResult?.data;

    const postsResult = await axiosRequest({
      endPoint: `/users/${params.userId}/posts`,
      config,
    });
    const postsData: PostType[] = postsResult?.data;

    return { user: userData, posts: postsData };
  };
  return defer({ user: userRequest() });
};

export default userLoader;
