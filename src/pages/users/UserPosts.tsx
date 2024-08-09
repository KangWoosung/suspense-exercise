/*  2024-08-08 05:55:15


*/

import { PostType } from "../Posts";
import { Link, useAsyncValue } from "react-router-dom";

type UserPostsObjectType = {
  posts: PostType[];
};

const UserPosts = () => {
  const { posts } = useAsyncValue() as UserPostsObjectType;
  console.log(posts);

  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-4">Posts</h2>
      <div className="bg-accent rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-indigo-100">
          {posts.map((post: PostType) => (
            <li
              key={post.id}
              className="p-4 hover:bg-indigo-500 transition-colors duration-100"
            >
              <Link
                to={`/posts/${post.id}`}
                className="text-foreground hover:text-indigo-300"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserPosts;
