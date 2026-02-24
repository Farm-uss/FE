import { useEffect, useState } from 'react';

import axiosInstance from '@/apis/axios';

export const useImageBlob = (imgUrl: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imgUrl) return;

    const fetchImage = async () => {
      setIsLoading(true);
      let baseUrl = import.meta.env.VITE_API_BASE_URL || '';

      // 주소 보정 로직 (그대로 유지)
      if (baseUrl.endsWith('/') && imgUrl.startsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
      } else if (!baseUrl.endsWith('/') && !imgUrl.startsWith('/')) {
        baseUrl = baseUrl + '/';
      }

      const fullUrl = imgUrl.startsWith('http')
        ? imgUrl
        : `${baseUrl}${imgUrl}`;

      try {
        const response = await axiosInstance.get(fullUrl, {
          responseType: 'blob',
        });
        const blobUrl = URL.createObjectURL(response.data);
        setImageSrc(blobUrl);
      } catch (error) {
        console.error(`이미지 로드 실패:`, error);
        setImageSrc('/icons/farmBasicImg.svg'); // 에러 시 기본 이미지
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    // 메모리 누수 방지 (정리 함수)
    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imgUrl]);

  return { imageSrc, isLoading };
};
