import { useCallback, useEffect, useState } from 'react';

import { getMyFarms, getMyFarmsSummary } from '@/apis/farmService';
import type { FarmResponse, FarmSummary } from '@/types/farm';

export const useFarmData = () => {
  const [farms, setFarms] = useState<FarmResponse[]>([]);
  const [summary, setSummary] = useState<FarmSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      // 병렬로 데이터 호출
      const [farmsData, summaryData] = await Promise.all([
        getMyFarms(),
        getMyFarmsSummary(),
      ]);

      setFarms(farmsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err);
      console.error('농장 데이터를 가져오는데 실패했습니다 :', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch(); // 마운트 시 최초 호출
  }, [refetch]);

  return { farms, summary, loading, error, refetch };
};
