import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

type LoadingMainProps = {
  message?: string | null;
};

const LoadingMain = ({ message = null }: LoadingMainProps) => {
  return (
    <>
      <div className="loading-spinner flex flex-row justify-center items-center w-full py-24">
        <ImSpinner2 className="animate-spin" fontSize="2rem" />
        <p>{message}</p>
      </div>
    </>
  );
};

export default LoadingMain;

type LoadingFallbackProps = {
  setIsSuspenseLoading: (value: boolean) => void;
  message: string;
};
export const LoadingFallback = ({
  setIsSuspenseLoading,
  message,
}: LoadingFallbackProps) => {
  useEffect(() => {
    setIsSuspenseLoading(true);
    return () => setIsSuspenseLoading(false);
  }, [setIsSuspenseLoading]);

  return <LoadingMain message={message} />;
};
