import { useCallback, useEffect, useState } from 'react';

import { getGrowthMetrics } from '@/apis/farmService';
import type { GrowthMetricData, GrowthMetricType } from '@/types/farmService';

export const useGrowthMetrics = (
  farmId: number,
  cropsId: number,
  metric: GrowthMetricType,
  windowDays: number | null,
) => {
  const [data, setData] = useState<GrowthMetricData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (!windowDays) return;
    try {
      setLoading(true);
      const result = await getGrowthMetrics(
        farmId,
        cropsId,
        metric,
        windowDays,
      );
      setData(result);
    } catch (err) {
      setError(err);
      console.error('성장 지표 데이터를 가져오는데 실패했습니다 :', err);
    } finally {
      setLoading(false);
    }
  }, [farmId, cropsId, metric, windowDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
