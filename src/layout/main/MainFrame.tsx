/*


*/

import { cn } from "@/lib/utils";
import React from "react";

type MainFrameProps = {
  className?: string;
  children: React.ReactNode;
};

const MainFrame = ({ className, children }: MainFrameProps) => {
  return (
    <main className={cn(className, "flex items-center justify-center w-full")}>
      <div className="w-full max-w-screen-lg bg-background py-20">
        {children}
      </div>
    </main>
  );
};

export default MainFrame;
