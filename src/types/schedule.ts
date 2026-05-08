export type ControlSystemType =
    | 'IRRIGATION'
    | 'LIGHTING'
    | 'VENTILATION'
    | 'HEATING'
    | 'CAMERA';

export type SensorType =
    | 'TEMPERATURE'
    | 'SOIL_MOISTURE'
    | 'HUMIDITY'
    | 'ILLUMINANCE'
    | 'CO2';

export type ConditionOperator = 'GREATER_THAN' | 'LESS_THAN' | 'EQUAL';

export type DayOfWeek =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

export type ScheduleType = 'TIME_BASED' | 'CONDITION_BASED';

export type ExecutionStatus = 'SUCCESS' | 'FAIL' | 'CANCELED' | 'SKIPPED';

export interface ApiResponse<T> {
    result: string;
    data: T;
    message: string;
}

export interface LocalTime {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

export interface TimeBasedScheduleRequest {
    farmId: number;
    name: string;
    controlSystemType: ControlSystemType;
    executeTime: LocalTime; // ✅ 다시 올바른 객체 타입으로 복구
    daysOfWeek: DayOfWeek[];
    durationMinutes: number;
}

export interface TimeRule {
    executeTime: LocalTime;
    daysOfWeek: DayOfWeek[];
    durationMinutes: number;
}

export interface TimeBasedScheduleDetail {
    scheduleId: number;
    farmId: number;
    name: string;
    controlSystemType: ControlSystemType;
    controlSystemDescription: string;
    enabled: boolean;
    summary: string;
    timeRule: TimeRule;
    lastExecutedAt: string | null;
    lastExecutionStatus: ExecutionStatus | null;
    createdAt: string;
    updatedAt: string;
}

export interface ConditionBasedScheduleRequest {
    farmId: number;
    name: string;
    controlSystemType: ControlSystemType;
    sensorType: SensorType;
    operator: ConditionOperator;
    thresholdValue: number;
    autoStopWhenRecovered: boolean;
}

export interface ConditionRule {
    sensorType: SensorType;
    sensorDescription: string;
    operator: ConditionOperator;
    operatorDescription: string;
    conditionValue: number;
    autoStopWhenRecovered: boolean;
}

export interface ConditionBasedScheduleDetail {
    scheduleId: number;
    farmId: number;
    name: string;
    controlSystemType: ControlSystemType;
    controlSystemDescription: string;
    enabled: boolean;
    summary: string;
    conditionRule: ConditionRule;
    lastExecutedAt: string | null;
    lastExecutionStatus: ExecutionStatus | null;
    createdAt: string;
    updatedAt: string;
}

export interface ScheduleListItem {
    scheduleId: number;
    farmId: number;
    name: string;
    controlSystemType: ControlSystemType;
    controlSystemDescription: string;
    scheduleType: ScheduleType;
    scheduleTypeDescription: string;
    enabled: boolean;
    summary: string;
    lastExecutedAt: string | null;
    lastExecutionStatus: ExecutionStatus | null;
    createdAt: string;
    updatedAt: string;
}

export interface ToggleEnabledRequest {
    enabled: boolean;
}

export interface ToggleEnabledResponse extends ScheduleListItem {
    timeRule?: TimeRule;
    conditionRule?: ConditionRule;
}

export interface ScheduleHistoryItem {
    historyId: number;
    scheduleId: number;
    scheduleName: string;
    executedAt: string;
    status: ExecutionStatus;
    statusDescription: string;
    message: string;
    triggerValue: number;
    durationMinutes: number;
}