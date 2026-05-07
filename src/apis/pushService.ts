import axiosInstance from './axios';

/** VAPID 공개키 조회 */
export const getPushPublicKey = async (): Promise<string> => {
  const res = await axiosInstance.get('/api/push/public-key');
  return res.data.publicKey;
};

const toBase64Url = (buffer: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const sendPushSubscription = async (
  sub: PushSubscription,
): Promise<void> => {
  const key = sub.getKey('p256dh');
  const auth = sub.getKey('auth');
  await axiosInstance.post('/api/push/subscribe', {
    endpoint: sub.endpoint,
    p256dh: key ? toBase64Url(key) : '',
    auth: auth ? toBase64Url(auth) : '',
  });
};
