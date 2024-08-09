/*



*/

import LoadingMain from "@/components/main/LoadingMain";
import React, { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";

export type UserType = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type UseLoaderDataType = {
  usersPromise: Promise<UserType[]>;
};

const Users: React.FC = () => {
  const { usersPromise } = useLoaderData() as UseLoaderDataType;

  return (
    <div className="bg-background min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Users</h1>
      <Suspense fallback={<LoadingMain />}>
        <Await resolve={usersPromise} errorElement={<div>Error occurred</div>}>
          <UsersMap />
        </Await>
      </Suspense>
    </div>
  );
};

function UsersMap() {
  const users = useAsyncValue() as UserType[];

  console.log("Users data in AWAIT :", users);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user: UserType) => (
        <Link
          key={user.id}
          to={`/users/${user.id}`}
          className=" transition-colors duration-300"
        >
          <div
            key={user.id}
            className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-accent"
          >
            <div className="bg-foreground p-4">
              <h2 className="text-xl font-semibold text-background">
                {user.name}
              </h2>
            </div>
            <div className="p-4 space-y-2 bg-accent">
              <div className="text-navy-600">
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div className="text-navy-600">
                <span className="font-medium">Address:</span>{" "}
                {user.address.street}
              </div>
              <div className="text-navy-600">
                <span className="font-medium">Phone:</span> {user.phone}
              </div>
              <div className="text-navy-600">
                <span className="font-medium">Website:</span> {user.website}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Users;
