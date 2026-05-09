import type {
    ApiResponse,
    ConditionBasedScheduleDetail,
    ConditionBasedScheduleRequest,
    ScheduleHistoryItem,
    ScheduleListItem,
    TimeBasedScheduleDetail,
    TimeBasedScheduleRequest,
    ToggleEnabledResponse,
} from '@/types/schedule';

import axiosInstance from './axios';

export const createTimeBasedSchedule = async (
    body: TimeBasedScheduleRequest,
): Promise<TimeBasedScheduleDetail> => {
    const response = await axiosInstance.post<ApiResponse<TimeBasedScheduleDetail>>(
        '/api/schedules/time-based',
        body,
    );
    return response.data.data;
};

export const createConditionBasedSchedule = async (
    body: ConditionBasedScheduleRequest,
): Promise<ConditionBasedScheduleDetail> => {
    const response = await axiosInstance.post<ApiResponse<ConditionBasedScheduleDetail>>(
        '/api/schedules/condition-based',
        body,
    );
    return response.data.data;
};

export const getTimeBasedSchedule = async (
    scheduleId: number,
): Promise<TimeBasedScheduleDetail> => {
    const response = await axiosInstance.get<ApiResponse<TimeBasedScheduleDetail>>(
        `/api/schedules/${scheduleId}/time-based`,
    );
    return response.data.data;
};

export const getConditionBasedSchedule = async (
    scheduleId: number,
): Promise<ConditionBasedScheduleDetail> => {
    const response = await axiosInstance.get<ApiResponse<ConditionBasedScheduleDetail>>(
        `/api/schedules/${scheduleId}/condition-based`,
    );
    return response.data.data;
};

export const updateTimeBasedSchedule = async (
    scheduleId: number,
    body: TimeBasedScheduleRequest,
): Promise<TimeBasedScheduleDetail> => {
    const response = await axiosInstance.put<ApiResponse<TimeBasedScheduleDetail>>(
        `/api/schedules/${scheduleId}/time-based`,
        body,
    );
    return response.data.data;
};

export const updateConditionBasedSchedule = async (
    scheduleId: number,
    body: ConditionBasedScheduleRequest,
): Promise<ConditionBasedScheduleDetail> => {
    const response = await axiosInstance.put<ApiResponse<ConditionBasedScheduleDetail>>(
        `/api/schedules/${scheduleId}/condition-based`,
        body,
    );
    return response.data.data;
};

export const toggleScheduleEnabled = async (
    scheduleId: number,
    enabled: boolean,
): Promise<ToggleEnabledResponse> => {

    const response = await axiosInstance.patch<
        ApiResponse<ToggleEnabledResponse>
    >(
        `/api/schedules/${scheduleId}/enabled`,
        { enabled },
    );

    return response.data.data;
};

export const getSchedulesByFarm = async (
    farmId: number,
): Promise<ScheduleListItem[]> => {
    const response = await axiosInstance.get<ApiResponse<ScheduleListItem[]>>(
        '/api/schedules',
        { params: { farmId } },
    );
    return response.data.data;
};

export const getScheduleHistories = async (
    scheduleId: number,
): Promise<ScheduleHistoryItem[]> => {
    const response = await axiosInstance.get<ApiResponse<ScheduleHistoryItem[]>>(
        `/api/schedules/${scheduleId}/histories`,
    );
    return response.data.data;
};

export const getFarmScheduleHistories = async (
    farmId: number,
): Promise<ScheduleHistoryItem[]> => {
    const response = await axiosInstance.get<ApiResponse<ScheduleHistoryItem[]>>(
        '/api/schedules/histories',
        { params: { farmId } },
    );
    return response.data.data;
};

export const deleteSchedule = async (scheduleId: number): Promise<void> => {
    if (!scheduleId) {
        console.error("🚨 삭제 오류: scheduleId 값이 비어있습니다!");
        alert("삭제하려는 스케줄의 ID를 찾을 수 없습니다.");
        return;
    }

    await axiosInstance.delete(`/api/schedules/${scheduleId}`);
};