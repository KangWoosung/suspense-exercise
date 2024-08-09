/*   2024-08-02 05:14:59

Suspense 를 사용하면, useLoaderData() 가 프라미스를 리턴해야 하고,
이 컴포넌트에서는 useLoaderData() 가 리턴하는 프라미스의 resolve 를 기다려야 한다.
따라서, 현재 이 컴포넌트에서는 리졸브된 데이터로 작업이 불가능하기 때문에,
리졸브 이후의 데이터를 별도의 컴포넌트에 넘겨주고, 거기서 데이터 작업이 수행되도록 구성해줘야만 한다. 

*/

import React, { lazy, Suspense } from "react";
import {
  Await,
  useAsyncError,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import LoadingMain from "@/components/main/LoadingMain";

const PostsContent = lazy(() => import("./posts/PostsContent"));

export const DATASET_SIZE = 100;

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Posts: React.FC = () => {
  const postsPromise = useLoaderData() as {
    initialData: Promise<PostType[]>;
    fetchMore: (start: number, end: number) => Promise<PostType[]>;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  return (
    <div className="bg-accent w-full min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <Suspense fallback={<LoadingMain />}>
        <Await
          resolve={postsPromise.initialData}
          errorElement={<AsyncErrorHandler />}
        >
          {(resolvedData) => {
            console.log(resolvedData);
            return (
              <PostsContent
                initialPosts={resolvedData}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
                fetchMore={postsPromise.fetchMore}
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

const AsyncErrorHandler = () => {
  const error = useAsyncError();
  return <div>{(error as Error).message}</div>;
};

// ErrorComponent.tsx
// const ErrorComponent = () => {
//   const error = useAsyncError();
//   console.error("Data loading error:", error);
//   return <div>Error occurred: {(error as Error).message}</div>;
// };

export default Posts;
