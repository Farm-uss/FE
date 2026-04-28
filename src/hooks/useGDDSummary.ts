import { useEffect, useState } from 'react';

import { getGDDSummary } from '@/apis/farmService';
import type { GDDSummaryData } from '@/types/farmService';

export const useGDDSummary = (
  farmId: number | undefined,
  cropsId: number | undefined,
) => {
  const [data, setData] = useState<GDDSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!farmId || !cropsId) return;

    const fetch = async () => {
      try {
        const result = await getGDDSummary(farmId, cropsId);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [farmId, cropsId]);

  return { data, loading, error };
};
