import { useState, useCallback } from 'react';

/**
 * @param {Function} service      - The async function to call (e.g., API request)
 * @param {Function} [onSuccess]  - Callback for success (optional)
 * @param {Function} [onError]    - Callback for error (optional)
 * @param {Function} [onFinish]   - Callback after success/error (optional)
 */
export default function useFetch(service, { onSuccess, onError, onFinish } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [dependency, setDependency] = useState(0);
  const trigger = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await service(...args);
      setData(response.data);
      onSuccess?.(response);
      if (!response.success) {
        setError(response.data);
      }
    } catch (err) {
      setError(err?.response?.data || err?.message || 'An error occurred');
      onError?.(err?.response?.data || err?.message || 'An error occurred');
    } finally {
      setLoading(false);
      onFinish?.();
    }
  }, [service, onSuccess, onError, onFinish, dependency]);

  const refresh = useCallback(() => {
    setDependency((prev) => prev + 1);
  }, []);
  return { loading, error, data, trigger, refresh, dependency };
}