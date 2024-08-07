// axiosRequest 에서 에러 처리가 되고 있으므로, loader 에서의 에러 처리는 굳이 필요 없다.

import { CommentType, PostLoaderDataType } from "@/pages/Post";
import { PostType } from "@/pages/Posts";
import { UserType } from "@/pages/Users";
import { axiosRequest } from "@/util/axiosInstance";
import { LoaderFunctionArgs } from "react-router-dom";

// AbortController 역시 axiosRequest 에서 처리되고 있으므로, loader 에서의 처리는 필요 없다.
const postLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<PostLoaderDataType | null> => {
  //   console.log(params.postId);
  const config = { method: "GET" };

  const postResult = await axiosRequest({
    endPoint: "/posts/" + params.postId,
    config,
  });
  const postData: PostType = postResult?.data;

  const commentResult = await axiosRequest({
    endPoint: `/posts/${params.postId}/comments`,
    config,
  });
  const commentData: CommentType[] = commentResult?.data;

  const userResult = await axiosRequest({
    endPoint: `/users/${postData.userId}`,
    config,
  });
  const userData: UserType = userResult?.data;

  return { post: postData, comments: commentData, user: userData };
};

export default postLoader;
