/*  2024-08-02 05:46:31


*/

import Pagination from "@/components/Pagination";
import { Link, SetURLSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE, PostType } from "../Posts";
import { useEffect, useState } from "react";

const PostsContent: React.FC<{
  posts: PostType[];
  currentPage: number;
  setSearchParams: SetURLSearchParams;
}> = ({ posts, currentPage, setSearchParams }) => {
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, posts]);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  return (
    <>
      <div className="space-y-4 mb-8">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/posts/${post.id}`}
              className="flex items-center p-4 hover:bg-accent transition-colors duration-300"
            >
              <span className="font-medium w-12 flex-shrink-0">{post.id}</span>
              <h2 className="text-md font-medium hover:text-indigo-700 transition-colors duration-300 flex-grow">
                {post.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PostsContent;
