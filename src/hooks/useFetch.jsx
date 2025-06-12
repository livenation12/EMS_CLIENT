import { useState, useCallback } from 'react';

/**
 * @param {Function} service      - The async function to call (e.g., API request)
 * @param {Function} [onSuccess]  - Callback for success (optional)
 * @param {Function} [onError]    - Callback for error (optional)
 * @param {Function} [onFinish]   - Callback after success/error (optional)
 */
export default function useFetch(service, { onSuccess, onError, onFinish } ) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [data,    setData]    = useState(null);

  const trigger = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await service(...args);
      setData(response);
      onSuccess?.(response);
    } catch (err) {
      setError(err?.response?.data || err?.message || 'An error occurred');
      onError?.(err?.response?.data || err?.message || 'An error occurred');
    } finally {
      setLoading(false);
      onFinish?.();
    }
  }, [service, onSuccess, onError, onFinish]);

  return { loading, error, data, trigger };
}