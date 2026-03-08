import { useState } from 'react';
import api from '@/apis/axios';

import addFriendImg from '@/assets/image/addfriend/addfriend.png';
import shadowImg from '@/assets/image/addfriend/shadow.png';
import addFriend2Img from '@/assets/image/addfriend/addfriend2.png';
import shadow2Img from '@/assets/image/addfriend/shadow2.png';
import plusImg from '@/assets/image/addfriend/plus.png';

interface FriendAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    farmId: number;
}

const FriendAddModal = ({ isOpen, onClose, farmId }: FriendAddModalProps) => {
    const [notFound, setNotFound] = useState(false);
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleAddClick = async () => {
        if (!email.trim()) return;

        try {
            const response = await api.post(`/farms/${farmId}/members`, {
                email: email.trim(),
            });

            if (response.status === 200) {
                alert('친구 추가에 성공했습니다! 🎉');
                handleClose();
            }
        } catch (error: any) {
            console.error("친구 추가 실패:", error);
            if (error.response) {
                console.log("서버 응답 데이터:", error.response.data);
                console.log("서버 응답 상태:", error.response.status);
            }

            setNotFound(true);
        }
    };

    const handleClose = () => {
        setNotFound(false);
        setEmail('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

            <div className="relative w-[344px] h-[291px] bg-[#F2F2F2] rounded-[16px] px-6 pt-8 pb-6 z-10 shadow-xl flex flex-col justify-between">
                <div className="relative flex items-center justify-center">
                    <h2 className="text-[18px] font-bold text-[#2A160C]">친구 추가하기</h2>
                    <button onClick={handleClose} className="absolute right-4 text-[20px] text-[#2A160C]">✕</button>
                </div>

                {!notFound ? (
                    <div className="flex flex-col items-center -mt-2">
                        <img src={addFriendImg} alt="friends" className="w-[250px]" />
                        <img src={shadowImg} alt="shadow" className="w-[290px] -mt-6" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-[14px] text-[#2A160C] mt-1 mb-1">친구를 찾을 수 없습니다.</p>
                        <img src={addFriend2Img} alt="notfound" className="w-[100px] mt-2" />
                        <img src={shadow2Img} alt="shadow2" className="w-[130px] -mt-5" />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="친구의 메일 주소를 적어주세요."
                        className="flex-1 h-[54px] bg-[#E7E1D8] border-2 border-dashed border-[#3A1F0F] rounded-[8px] px-5 text-[14px] outline-none"
                    />
                    <button onClick={handleAddClick} className="w-[70px] h-[54px] flex items-center justify-center">
                        <img src={plusImg} alt="add" className="w-[70px] h-[54px] object-cover" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendAddModal;