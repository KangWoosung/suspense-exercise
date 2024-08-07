/*  2024-08-02 05:46:31


*/

import Pagination from "@/components/Pagination";
import { Link, SetURLSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { PostType } from "../Posts";
import { DATASET_SIZE, ITEMS_PER_PAGE } from "@/lib/constants";

type PostsContentProps = {
  initialPosts: PostType[];
  currentPage: number;
  setSearchParams: SetURLSearchParams;
  fetchMore: (start: number, end: number) => Promise<PostType[]>;
};

const PostsContent: React.FC<PostsContentProps> = ({
  initialPosts,
  currentPage,
  setSearchParams,
  fetchMore,
}) => {
  const [allPosts, setAllPosts] = useState<PostType[]>(initialPosts);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateCurrentPosts = useCallback(() => {
    const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
    setCurrentPosts(allPosts.slice(indexOfFirstPost, indexOfLastPost));
  }, [allPosts, currentPage]);

  useEffect(() => {
    updateCurrentPosts();
  }, [updateCurrentPosts]);

  const handlePageChange = async (pageNumber: number) => {
    const newStartIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    if (newStartIndex >= allPosts.length) {
      setIsLoading(true);
      const newPosts = await fetchMore(
        allPosts.length,
        allPosts.length + DATASET_SIZE
      );
      setAllPosts((prev) => [...prev, ...newPosts]);
      setIsLoading(false);
    }
    setSearchParams({ page: pageNumber.toString() });
  };

  const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE);

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
        isLoading={isLoading}
      />
    </>
  );
};

export default PostsContent;
