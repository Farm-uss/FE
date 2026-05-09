import type {
    ConditionOperator,
    ControlSystemType,
    DayOfWeek,
    SensorType,
} from '@/types/schedule';

const SYSTEM_UI_TO_API: Record<string, string> = {
    '관수 시스템': 'IRRIGATION',
    '조명 시스템': 'LIGHTING',
    '환기 시스템': 'VENTILATION',
    '난방 시스템': 'HEATING',
    '카메라': 'CAMERA',
    irrigation: 'IRRIGATION',
    lighting: 'LIGHTING',
    ventilation: 'VENTILATION',
    heating: 'HEATING',
    camera: 'CAMERA',
};

const SYSTEM_API_TO_UI: Record<string, string> = {
    IRRIGATION: 'irrigation',
    LIGHTING: 'lighting',
    VENTILATION: 'ventilation',
    HEATING: 'heating',
    CAMERA: 'camera',
};

export const toApiControlSystem = (ui: string): ControlSystemType =>
    (SYSTEM_UI_TO_API[ui] || 'IRRIGATION') as ControlSystemType;

export const toUiControlSystem = (api: ControlSystemType): string =>
    SYSTEM_API_TO_UI[api as string] ?? 'irrigation';

// 2. 센서 타입 매핑
const SENSOR_UI_TO_API: Record<string, string> = {
    '온도': 'SOIL_TEMPERATURE',
    '토양 수분': 'SOIL_MOISTURE',
    '습도': 'HUMIDITY',
    '조도': 'ILLUMINANCE',
    'CO2': 'CO2',
    temperature: 'SOIL_TEMPERATURE',
    soilMoisture: 'SOIL_MOISTURE',
    humidity: 'HUMIDITY',
    illuminance: 'ILLUMINANCE',
    co2: 'CO2',
};

const SENSOR_API_TO_UI: Record<string, string> = {
    TEMPERATURE: 'temperature',
    SOIL_MOISTURE: 'soilMoisture',
    HUMIDITY: 'humidity',
    ILLUMINANCE: 'illuminance',
    CO2: 'co2',
};

export const toApiSensor = (ui: string): SensorType =>
    (SENSOR_UI_TO_API[ui] || 'TEMPERATURE') as SensorType;

export const toUiSensor = (api: SensorType): string =>
    SENSOR_API_TO_UI[api as string] ?? 'temperature';

const OP_UI_TO_API: Record<string, string> = {
    greater: 'GREATER_THAN',
    less: 'LESS_THAN',
    equal: 'GREATER_THAN_OR_EQUAL',
};

const OP_API_TO_UI: Record<string, string> = {
    GREATER_THAN: 'greater',
    LESS_THAN: 'less',
    EQUAL: 'equal',
};

export const toApiOperator = (ui: string): ConditionOperator =>
    (OP_UI_TO_API[ui] || 'GREATER_THAN') as ConditionOperator;

export const toUiOperator = (api: ConditionOperator): string =>
    OP_API_TO_UI[api as string] ?? 'greater';

const DAY_UI_TO_API: Record<string, DayOfWeek> = {
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
    일: 'SUNDAY',
};

const DAY_API_TO_UI: Record<string, string> = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
};

export const toApiDays = (uiDays: string[]): DayOfWeek[] =>
    uiDays.map((d) => DAY_UI_TO_API[d]).filter(Boolean) as DayOfWeek[];

export const toUiDays = (apiDays: DayOfWeek[]): string[] =>
    apiDays.map((d) => DAY_API_TO_UI[d]).filter(Boolean);

// 변경 후 (문자열 반환)
export const toLocalTime = (hourStr: string, minuteStr: string): any => {
    const hh = String(Number(hourStr) || 0).padStart(2, '0');
    const mm = String(Number(minuteStr) || 0).padStart(2, '0');
    return `${hh}:${mm}:00`;
};

export const formatExecutedAt = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '-';

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');

    return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
};