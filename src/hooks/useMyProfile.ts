import { useCallback, useEffect, useState } from 'react';

import { getMyProfile } from '@/apis/userService';
import type { UserProfile } from '@/types/user';

export const useMyProfile = () => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const profile = await getMyProfile();
      setData(profile);
    } catch (err) {
      setError(err);
      console.error('프로필 정보를 가져오는데 실패했습니다 :', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};
