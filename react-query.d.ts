import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface UseQueryOptions {
    suspense?: boolean;
  }
}
