import { useState } from "react";

type fetchCallback<T> = (
  options: Record<string, string>,
  ...args: any[]
) => Promise<T>;

export const useFetch = <T>(
  cb: fetchCallback<T>,
  options: Record<string, string> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error | null>(null);

  const fn = async (...args: any[]): Promise<void> => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await cb(options, ...args);

      setData(response);
    } catch (error) {
      setErrors(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, errors, fn };
};
