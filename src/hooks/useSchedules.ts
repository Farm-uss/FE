import { useCallback, useEffect, useState } from 'react';

import {
    getFarmScheduleHistories,
    getSchedulesByFarm,
} from '@/apis/scheduleService';
import type {
    ScheduleHistoryItem,
    ScheduleListItem,
} from '@/types/schedule';

export const useSchedules = (farmId: number | null) => {
    const [schedules, setSchedules] = useState<ScheduleListItem[]>([]);
    const [histories, setHistories] = useState<ScheduleHistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const refetch = useCallback(async () => {
        if (farmId === null || Number.isNaN(farmId)) return;

        try {
            setLoading(true);
            const [list, history] = await Promise.all([
                getSchedulesByFarm(farmId),
                getFarmScheduleHistories(farmId),
            ]);
            setSchedules(list ?? []);
            setHistories(history ?? []);
        } catch (err) {
            setError(err);
            console.error('스케줄 데이터를 가져오는데 실패했습니다 :', err);
        } finally {
            setLoading(false);
        }
    }, [farmId]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { schedules, histories, loading, error, refetch };
};
