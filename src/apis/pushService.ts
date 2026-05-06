import axiosInstance from './axios';

/** VAPID 공개키 조회 */
export const getPushPublicKey = async (): Promise<string> => {
  const res = await axiosInstance.get('/api/push/public-key');
  return res.data.publicKey;
};

/** 구독 정보 서버에 저장 */
export const sendPushSubscription = async (
  sub: PushSubscription,
): Promise<void> => {
  const key = sub.getKey('p256dh');
  const auth = sub.getKey('auth');
  await axiosInstance.post('/api/push/subscribe', {
    endpoint: sub.endpoint,
    p256dh: key ? btoa(String.fromCharCode(...new Uint8Array(key))) : '',
    auth: auth ? btoa(String.fromCharCode(...new Uint8Array(auth))) : '',
  });
};
