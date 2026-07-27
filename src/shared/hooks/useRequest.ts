import { useState, useCallback } from "react";
import requestTuple from "../utils/requestTuple";
import dummyLogger from "../utils/dummyLogger";

export default function useRequest(baseUrl: string) {
  const [BASE_URL] = useState<string>(baseUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = useCallback(async (url: string, options?: RequestInit) => {
    setIsLoading(true);

    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
    dummyLogger.info(`fetched '${fullUrl}', with options: ${JSON.stringify(options ?? {})}`);
    const response = await requestTuple(fetch(fullUrl, options));

    const [error, data] = response;

    if (error != null) {
      dummyLogger.error(`'${fullUrl}' fetch failed with error: ${JSON.stringify(error)}`);
    } else {
      dummyLogger.info(`'${fullUrl}' fetch succeded with data: ${JSON.stringify(data)}`);
    }

    setIsLoading(false);

    return response;
  }, [BASE_URL]);

  return { request, isLoading }
}