/*  2024-08-08 05:55:30


*/

import { UserType } from "../Users";
import { useAsyncValue } from "react-router-dom";

type UserObjectType = {
  user: UserType;
};

const UserContent = () => {
  const { user } = useAsyncValue() as UserObjectType;
  console.log(user);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">User Details</h1>

      <div className="bg-background rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-foreground p-4 text-white">
          <h2 className="text-2xl font-semibold text-background">
            Personal Information
          </h2>
        </div>
        <div className="p-6 space-y-4 bg-accent">
          <p className="">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p className="">
            <span className="font-medium">Website:</span> {user.website}
          </p>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-foreground p-4 ">
          <h2 className="text-2xl font-semibold text-background">Address</h2>
        </div>
        <div className="p-6 space-y-4 bg-accent">
          <p className="">
            <span className="font-medium">Street:</span> {user.address?.street}
          </p>
          <p className="">
            <span className="font-medium">Suite:</span> {user.address?.suite}
          </p>
          <p className="">
            <span className="font-medium">City:</span> {user.address?.city}
          </p>
          <p className="">
            <span className="font-medium">Zipcode:</span>{" "}
            {user.address?.zipcode}
          </p>
          <p className="">
            <span className="font-medium">Geo:</span> {user.address?.geo.lat},{" "}
            {user.address?.geo.lng}
          </p>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-foreground p-4 text-background">
          <h2 className="text-2xl font-semibold">Company</h2>
        </div>
        <div className="p-6 space-y-4 bg-accent">
          <p className="">
            <span className="font-medium">Name:</span> {user.company?.name}
          </p>
          <p className="">
            <span className="font-medium">Catch Phrase:</span>{" "}
            {user.company?.catchPhrase}
          </p>
          <p className="">
            <span className="font-medium">BS:</span> {user.company?.bs}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserContent;
