import { useState } from 'react';

import { removeFarmMember } from '@/apis/farmService';
import { useFarmData } from '@/hooks/useFarmData';

export const useDeleteFriends = (farmId: string | undefined) => {
  const { farms, loading, error, refetch } = useFarmData();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const farmInfo = farms.find((f) => String(f.farmId) === farmId);
  const members = farmInfo?.members || [];

  // 내보내기 버튼 클릭 시 대상 저장 및 모달 오픈
  const openDeleteModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsConfirmOpen(true);
  };

  // 실제 삭제 API 호출
  const handleDeleteConfirm = async () => {
    if (!selectedUserId || !farmId) return;

    try {
      await removeFarmMember(Number(farmId), selectedUserId);
      setIsConfirmOpen(false);
      setIsSuccessOpen(true);
      if (refetch) await refetch(); // 목록 새로고침
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('멤버를 내보내는 중 오류가 발생했습니다.');
    }
  };

  return {
    farmInfo,
    members,
    loading,
    error,
    isConfirmOpen,
    setIsConfirmOpen,
    isSuccessOpen,
    setIsSuccessOpen,
    openDeleteModal,
    handleDeleteConfirm,
    refetch,
  };
};
