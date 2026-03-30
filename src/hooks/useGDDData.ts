import { useEffect, useState } from 'react';

import { getGDDWindows } from '@/apis/farmService';
import type { GDDWindowResponse } from '@/types/farmService';

export const useGDDData = (farmId: number, cropsId: number) => {
  const [data, setData] = useState<GDDWindowResponse[]>([]);

  const [windowDays, setWindowDays] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (windowDays === null) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await getGDDWindows(farmId, cropsId, windowDays);
        setData(result);
      } catch (err) {
        console.error('GDD 데이터를 가져오는데 실패했습니다:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [farmId, cropsId, windowDays]); // windowDays가 바뀔 때마다 다시 실행됨

  return { data, windowDays, setWindowDays, loading };
};
