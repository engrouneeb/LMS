import { useState, useCallback } from 'react';
import { ApiResponse } from '../types/common';

interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(
  apiFunc: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiFunc(...args);
        
        if (!response.success) {
          throw new Error(response.error || 'An error occurred');
        }
        
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, error, isLoading, execute };
}

// Example usage:
/*
const { data, error, isLoading, execute } = useApi(loginApi);

useEffect(() => {
  execute(username, password);
}, [execute, username, password]);
*/ 