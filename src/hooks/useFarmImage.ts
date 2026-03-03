export const useFarmImage = (imgUrl: string | undefined): string => {
  // 1. 형이 알려준 S3 기본 이미지 주소
  const DEFAULT_IMAGE =
    'https://hansungfarmimg.s3.eu-north-1.amazonaws.com/farm/farmBasicImg.svg';

  // 2. 주소 데이터가 아예 없으면 기본 이미지 리턴
  if (!imgUrl) return DEFAULT_IMAGE;

  // 3. 이미 완성된 S3 주소(http로 시작)라면 그대로 사용
  if (imgUrl.startsWith('http')) return imgUrl;

  // 4. 문제의 '/home/farmus/uploads/' 경로가 포함되어 있다면?
  if (imgUrl.includes('/home/farmus/uploads/')) {
    // 파일명만 빼서 S3 주소랑 합치기
    const fileName = imgUrl.split('/').pop();
    return `https://hansungfarmimg.s3.eu-north-1.amazonaws.com/farm/${fileName}`;
  }

  return DEFAULT_IMAGE;
};
