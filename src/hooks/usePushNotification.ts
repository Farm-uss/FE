import { useCallback } from 'react';

import { getPushPublicKey, sendPushSubscription } from '@/apis/pushService';

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from([...atob(b64)].map((c) => c.charCodeAt(0)));
}

export const usePushNotification = () => {
  const subscribe = useCallback(async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();

    if (existing) {
      const savedEndpoint = localStorage.getItem('pushEndpoint');
      if (savedEndpoint === existing.endpoint) return;
    }

    const publicKey = await getPushPublicKey();
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    await sendPushSubscription(subscription);

    localStorage.setItem('pushEndpoint', subscription.endpoint);
  }, []);

  return { subscribe };
};
