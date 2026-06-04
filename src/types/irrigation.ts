export interface IrrigationResponse {
  result: string;
  data: {
    commandId: number;
    deviceId: number;
    commandType: string;
    durationSeconds: number | null;
    status: string;
    createdAt: string;
    executedAt: string | null;
  };
  message: string | null;
}
