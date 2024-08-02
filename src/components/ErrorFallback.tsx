/*  2024-07-30 19:03:02

*/

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <section>
      <div>
        <p>이용에 불편을 드려 죄송합니다.</p>
        <p>동일한 현상이 계속될 경우 문의 주시기 바랍니다.</p>
        <p>{import.meta.env.DEV && error.stack}</p>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>다시 시도하기</button>
      </div>
    </section>
  );
};

export default ErrorFallback;
