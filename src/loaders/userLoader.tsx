import { PostType } from "@/pages/Posts";
import { UserType } from "@/pages/Users";
import { axiosRequest } from "@/util/axiosInstance";
import { defer, LoaderFunctionArgs } from "react-router-dom";

const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const userRequest = async () => {
    const config = { method: "GET" };

    const userResult = await axiosRequest({
      endPoint: `/users/${params.userId}`,
      config,
    });
    const userData: UserType = userResult?.data;

    return { user: userData };
  };

  const postsRequest = async () => {
    const config = { method: "GET" };

    const postsResult = await axiosRequest({
      endPoint: `/users/${params.userId}/posts`,
      config,
    });
    const postsData: PostType[] = postsResult?.data;

    return { posts: postsData };
  };
  return defer({ userPromise: userRequest(), postsPromise: postsRequest() });
};

export default userLoader;
