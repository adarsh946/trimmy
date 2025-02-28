import { useState } from "react";

type fetchCallback<T> = (
  options: Record<string, any>,
  ...args: any[]
) => Promise<T>;

export const useFetch = <T>(
  cb: fetchCallback<T>,
  options: Record<string, any> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);

      setData(response);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};
