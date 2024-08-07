/*  2024-08-03 04:47:15


*/

import { DATASET_SIZE } from "@/pages/Posts";
import { axiosRequest } from "@/util/axiosInstance";
import { defer } from "react-router-dom";

const postsLoader = () => {
  const fetchPosts = async (start: number, end: number) => {
    const config = { method: "GET" };
    const postsResult = await axiosRequest({
      endPoint: `/posts?_start=${start}&_end=${end}`,
      config,
    });
    return postsResult?.data;
  };

  return defer({
    initialData: fetchPosts(0, DATASET_SIZE),
    fetchMore: fetchPosts,
  });
};

export default postsLoader;
