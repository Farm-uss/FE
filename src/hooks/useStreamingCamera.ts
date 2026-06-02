import { useCallback, useRef, useState } from 'react';

import { storage } from '@/utils/storage';

export const useStreamingCamera = (farmId: number) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const prevBlobUrlRef = useRef<string | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);

  const start = useCallback(async () => {
    if (controllerRef.current) return;

    const controller = new AbortController();
    controllerRef.current = controller;
    setIsStreaming(true);
    setStreamError(null);

    try {
      const token = storage.getAccessToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/farms/${farmId}/camera/stream-proxy`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        },
      );

      if (!response.ok || !response.body) {
        setStreamError('스트리밍 연결에 실패했습니다.');
        setIsStreaming(false);
        controllerRef.current = null;
        return;
      }

      setIsConnected(true);
      const reader = response.body.getReader();
      let buffer = new Uint8Array(0);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const newBuffer = new Uint8Array(buffer.length + value.length);
        newBuffer.set(buffer);
        newBuffer.set(value, buffer.length);
        buffer = newBuffer;

        let start = -1;
        for (let i = 0; i < buffer.length - 1; i++) {
          if (buffer[i] === 0xff && buffer[i + 1] === 0xd8) {
            start = i;
            break;
          }
        }

        if (start !== -1) {
          for (let i = start + 2; i < buffer.length - 1; i++) {
            if (buffer[i] === 0xff && buffer[i + 1] === 0xd9) {
              const frame = buffer.slice(start, i + 2);
              const blob = new Blob([frame], { type: 'image/jpeg' });
              const url = URL.createObjectURL(blob);

              if (imgRef.current) imgRef.current.src = url;
              if (prevBlobUrlRef.current)
                URL.revokeObjectURL(prevBlobUrlRef.current);
              prevBlobUrlRef.current = url;

              buffer = buffer.slice(i + 2);
              break;
            }
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setStreamError('스트리밍 연결이 끊겼습니다.');
      }
    } finally {
      setIsStreaming(false);
      setIsConnected(false);
      controllerRef.current = null;
      if (prevBlobUrlRef.current) {
        URL.revokeObjectURL(prevBlobUrlRef.current);
        prevBlobUrlRef.current = null;
      }
    }
  }, [farmId]);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return { imgRef, isStreaming, isConnected, streamError, start, stop };
};
