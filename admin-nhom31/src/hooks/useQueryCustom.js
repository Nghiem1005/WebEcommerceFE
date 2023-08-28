import { useQuery } from "@tanstack/react-query";

function useQueryCustom(thunk, callbackApi) {
  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
    [thunk],
    callbackApi,
    {
      cacheTime: Infinity,
      staleTime: 40000,
    }
  );
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    refetch: refetch
  };
}

export default useQueryCustom;