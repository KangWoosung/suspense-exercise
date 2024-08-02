/*  2024-07-30 03:56:58


*/

import { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";
import LoadingMain from "@/components/main/LoadingMain";
// import Posts from "./children/Posts";

const Posts = lazy(() => import("./children/Posts"));

const Version1 = () => {
  const [targetDB, setTargetDB] = useState<string | null>(null);

  return (
    <div>
      <h1>Version1</h1>
      <div className="flex flex-col justify-between items-start gap-6">
        <p>JsonPlaceholder 의 users 와 posts 를 선택적으로 가져와보자.</p>
        <div className="flex flex-row justify-center items-center gap-6">
          <button
            className="border-2 border-foreground bg-accent rounded-none px-4 py-2"
            onClick={() => setTargetDB("users")}
          >
            Users
          </button>
          <button
            className="border-2 border-foreground bg-accent rounded-none px-4 py-2"
            onClick={() => setTargetDB("posts")}
          >
            Posts
          </button>
        </div>
        <ErrorBoundary
          fallbackRender={(fallbackProps) => (
            <ErrorFallback {...fallbackProps} />
          )}
        >
          <Suspense fallback={<LoadingMain />}>
            {targetDB && <Posts targetDB={targetDB} />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Version1;
