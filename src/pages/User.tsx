import React, { lazy, Suspense } from "react";
import { UserType } from "./Users";
import { Await, useAsyncError, useLoaderData } from "react-router-dom";
import { PostType } from "./Posts";
import LoadingMain from "@/components/main/LoadingMain";

const UserContent = lazy(() => import("./users/UserContent"));
const UserPosts = lazy(() => import("./users/UserPosts"));

type UserLoaderDataType = {
  userPromise: Promise<UserType>;
  postsPromise: Promise<PostType[]>;
};

const User: React.FC = () => {
  const { userPromise, postsPromise } = useLoaderData() as UserLoaderDataType;

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={<LoadingMain />}>
          <Await resolve={userPromise} errorElement={<AsyncErrorHandler />}>
            <UserContent />
          </Await>
          <Await resolve={postsPromise} errorElement={<AsyncErrorHandler />}>
            <UserPosts />
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

const AsyncErrorHandler = () => {
  const error = useAsyncError();
  return <div>{(error as Error).message} xxxx</div>;
};

export default User;
