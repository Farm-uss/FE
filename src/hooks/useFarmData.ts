import { useCallback, useEffect, useState } from 'react';

import { getMyFarms, getMyFarmsSummary } from '@/apis/farmService';
import type { FarmResponse, FarmSummary } from '@/types/farm';

export interface FarmWithDevice extends FarmResponse {
  isDeviceRegistered?: boolean; // 백엔드에 아직 없는 필드 더미로 추가
}

export const useFarmData = () => {
  const [farms, setFarms] = useState<FarmWithDevice[]>([]); // ✨ 타입 변경
  const [summary, setSummary] = useState<FarmSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const [farmsData, summaryData] = await Promise.all([
        getMyFarms(),
        getMyFarmsSummary(),
      ]);

      // [라즈베리파이 더미 로직 추가]
      const mappedFarms = farmsData.map((farm) => ({
        ...farm,
        isDeviceRegistered: true, // 일단 전부 기기 없음(false)으로 설정!
      }));

      setFarms(mappedFarms);
      setSummary(summaryData);
    } catch (err) {
      setError(err);
      console.error('농장 데이터를 가져오는데 실패했습니다 :', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { farms, summary, loading, error, refetch };
};
