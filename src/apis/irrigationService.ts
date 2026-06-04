import type { IrrigationResponse } from '@/types/irrigation';

import axiosInstance from './axios';

export const pumpOn = async (deviceId: number): Promise<IrrigationResponse> => {
  const response = await axiosInstance.post<IrrigationResponse>(
    '/api/irrigation',
    {
      deviceId,
      command: 'PUMP_ON',
      durationSeconds: 30,
    },
  );
  return response.data;
};

export const pumpOff = async (
  deviceId: number,
): Promise<IrrigationResponse> => {
  const response = await axiosInstance.post<IrrigationResponse>(
    '/api/irrigation',
    {
      deviceId,
      command: 'PUMP_OFF',
    },
  );
  return response.data;
};
