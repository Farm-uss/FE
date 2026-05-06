import { useCallback, useEffect, useRef, useState } from 'react';

import { getEnvDataById, getLatestEnvDataId } from '@/apis/envDataService';
import type { EnvData } from '@/types/farmService';

const POLL_INTERVAL = 30_000;

export const useEnvData = (deviceId: number | null) => {
  const [data, setData] = useState<EnvData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const loadingRef = useRef(false);

  const fetchEnvData = useCallback(async () => {
    if (!deviceId || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const envDataId = await getLatestEnvDataId(deviceId);
      const envData = await getEnvDataById(envDataId);
      setData(envData);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('환경 데이터 조회 실패:', err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    if (!deviceId) return;

    fetchEnvData(); // 최초 1회

    const interval = setInterval(fetchEnvData, POLL_INTERVAL);

    // 탭 다시 활성화될 때 즉시 갱신
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchEnvData();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [deviceId, fetchEnvData]);

  return { data, loading, error };
};
