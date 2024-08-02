/*   2024-08-02 05:14:59

Suspense 를 사용하면, useLoaderData() 가 프라미스를 리턴해야 하고,
이 컴포넌트에서는 useLoaderData() 가 리턴하는 프라미스의 resolve 를 기다려야 한다.
따라서, 현재 이 컴포넌트에서는 리졸브된 데이터로 작업이 불가능하기 때문에,
리졸브 이후의 데이터를 별도의 컴포넌트에 넘겨주고, 거기서 데이터 작업이 수행되도록 구성해줘야만 한다. 

*/

import { axiosRequest } from "@/util/axiosInstance";
import React, { Suspense } from "react";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import PostsContent from "./posts/PostsContent";
import LoadingMain from "@/components/main/LoadingMain";

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const ITEMS_PER_PAGE = 10;
export const DATASET_SIZE = 100;

const Posts: React.FC = () => {
  const { data } = useLoaderData() as { data: Promise<PostType> };
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  return (
    <div className="bg-accent w-full min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <Suspense fallback={<LoadingMain />}>
        <Await resolve={data} errorElement={<div>Error occurred</div>}>
          {(resolvedData) => {
            console.log(resolvedData);
            return (
              <PostsContent
                posts={resolvedData}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

// 2024-08-02 05:55:56
// loader 가 Suspense 에서 관리되므로, 이제 cancelToken 을 제거합니다.
// cancelToken 이 필요 없어졌으므로, try-catch 도 필요 없어졌습니다.
const loader = () => {
  const postsRequest = async () => {
    const config = { method: "GET" };

    const postsResult = await axiosRequest({
      endPoint: "/posts",
      config,
    });
    const postsData: PostType[] = postsResult?.data;

    console.log(postsData);
    return postsData;
  };

  return defer({ data: postsRequest() });
  // return await postsRequest();
};

const PostsRoute = {
  element: <Posts />,
  loader,
};

export default PostsRoute;
