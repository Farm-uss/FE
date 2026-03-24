import { useEffect, useState } from 'react';

import { getGDDWindows } from '@/apis/farmService';
import type { GDDWindowResponse } from '@/types/farmService';

export const useGDDData = (farmId: number, cropsId: number) => {
  const [data, setData] = useState<GDDWindowResponse[]>([]);
  // ✨ 타입을 number | null로 명시해주면 더 안전해!
  const [windowDays, setWindowDays] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✨ 핵심: windowDays가 null이면 (아무것도 선택 안 함) 함수를 종료해버려!
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
  }, [farmId, cropsId, windowDays]);

  return { data, windowDays, setWindowDays, loading };
};
