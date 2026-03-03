import { useEffect, useState } from 'react';

import axiosInstance from '@/apis/axios';

export const useImageBlob = (imgUrl: string | undefined) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✨ 형이 말한 S3 기본 이미지 주소
  const DEFAULT_IMAGE =
    'https://hansungfarmimg.s3.eu-north-1.amazonaws.com/farm/farmBasicImg.svg';

  useEffect(() => {
    // 1. 이미지가 없으면 바로 기본 이미지 리턴
    if (!imgUrl) {
      setImageSrc(DEFAULT_IMAGE);
      return;
    }

    const fetchImage = async () => {
      setIsLoading(true);

      // 🛠️ 주소 가공 로직: 서버 경로에서 파일명만 뽑아서 S3 주소로 조립!
      let processedUrl = imgUrl;

      if (imgUrl.includes('/home/farmus/uploads/')) {
        const fileName = imgUrl.split('/').pop(); // 파일명만 추출
        processedUrl = `https://hansungfarmimg.s3.eu-north-1.amazonaws.com/farm/${fileName}`;
      }

      // 🔍 최종 URL 생성
      const isFullUrl = processedUrl.startsWith('http');
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || 'https://farmus-api.duckdns.org';
      const fullUrl = isFullUrl
        ? processedUrl
        : `${baseUrl.replace(/\/$/, '')}${processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`}`;

      try {
        const response = await axiosInstance.get(fullUrl, {
          responseType: 'blob',
        });
        const blobUrl = URL.createObjectURL(response.data);
        setImageSrc(blobUrl);
      } catch (error) {
        console.error(`이미지 로드 실패 (${fullUrl}):`, error);
        // ❌ 에러 나면 기본 이미지로
        setImageSrc(DEFAULT_IMAGE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imgUrl]);

  return { imageSrc, isLoading };
};
