import type { AxiosResponse } from "axios";
import * as React from "react";

type ApiUseState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

interface FetcherType<T, B = unknown> {
  (url: string, body?: B): Promise<AxiosResponse<T>>;
}

export default function useApi<T, B = unknown>(
  url: string,
  fetcher: FetcherType<T, B>
) {
  const [state, setState] = React.useState<ApiUseState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = React.useCallback(
    async (body?: B) => {
      setState({ data: null, isLoading: true, error: null });

      try {
        const res = await fetcher(url, body);
        setState({ data: res.data, isLoading: false, error: null });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setState({
          data: null,
          isLoading: false,
          error: "Something went wrong",
        });
      }
    },
    [url, fetcher]
  );

  return { ...state, execute };
}
