// src/hooks/useFarmOptimalRange.ts
import { useEffect, useState } from 'react';

import { getFarmOptimalRange } from '@/apis/farmService';
import type { OptimalRangeResponse } from '@/types/farmService';

export const useFarmOptimalRange = (farmId: string | undefined) => {
  const [data, setData] = useState<OptimalRangeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!farmId) return;

    const fetch = async () => {
      try {
        const result = await getFarmOptimalRange(Number(farmId));
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [farmId]);

  return { data, loading, error };
};
