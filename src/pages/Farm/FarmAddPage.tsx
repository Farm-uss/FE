// src/pages/farm/FarmAddPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addFarm } from '@/apis/farmService';
import type { FarmAddRequest } from '@/types/farm';

const FarmAddPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FarmAddRequest>({
    name: '',
    area: '', // string으로 받지만 나중에 숫자로 변환 필요할 수 있음
    address: '',
    cropName: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // 에러 초기화

    try {
      await addFarm(formData);
      alert('농장이 성공적으로 등록되었습니다!');
      navigate('/home'); // 성공하면 대시보드로 이동
    } catch (err) {
      console.error('농장 등록 실패:', err);
      setError('농장 등록에 실패했어. 다시 시도해줘 형!');
      // 서버에서 보낸 에러 메시지가 있다면 그걸 보여줄 수도 있음
      // setError(err.response?.data?.message || '농장 등록에 실패했어. 다시 시도해줘 형!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-6">
      {/* 타이틀 영역 */}
      <div className="mb-8 mt-4 text-center">
        <h1 className="text-h-24b text-black">나만의 농장 등록하기</h1>
        <p className="text-b-14m text-gray-500 mt-2">
          새로운 농장을 추가하여 관리해 보세요.
        </p>
      </div>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
        {/* 농장 이름 */}
        <div>
          <label htmlFor="name" className="block text-b-14m text-black mb-2">
            농장 이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="예: 김아무개의 스마트 농장"
            className="w-full p-3 border border-gray-300 rounded-lg text-b-14m focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* 면적 */}
        <div>
          <label htmlFor="area" className="block text-b-14m text-black mb-2">
            면적 (단위: 평 또는 m²)
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="예: 100평 또는 330m²"
            className="w-full p-3 border border-gray-300 rounded-lg text-b-14m focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* 주소 */}
        <div>
          <label htmlFor="address" className="block text-b-14m text-black mb-2">
            농장 주소
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="예: 경기도 이천시 스마트농장길 123-45"
            className="w-full p-3 border border-gray-300 rounded-lg text-b-14m focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* 나중에 주소 API (카카오 지도 등) 연동할 자리 */}
          <button
            type="button"
            className="mt-2 text-c-12m text-blue-600 hover:underline"
            onClick={() => alert('나중에 주소 검색 API 연동할게요 형!')}
          >
            주소 검색
          </button>
        </div>

        {/* 작물명 */}
        <div>
          <label
            htmlFor="cropName"
            className="block text-b-14m text-black mb-2"
          >
            주요 작물명
          </label>
          <input
            type="text"
            id="cropName"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            placeholder="예: 딸기, 상추, 토마토"
            className="w-full p-3 border border-gray-300 rounded-lg text-b-14m focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 text-c-12m mt-2">{error}</p>}

        {/* 등록 버튼 */}
        <button
          type="submit"
          disabled={loading} // 로딩 중에는 버튼 비활성화
          className="w-full py-3 mt-auto bg-green-600 text-white text-h-18sb rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? '등록 중...' : '농장 등록하기'}
        </button>
      </form>
    </div>
  );
};

export default FarmAddPage;
