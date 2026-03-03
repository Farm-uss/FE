import Footer from '@/component/constants/Footer';
import BottomSheetHeader from '@/component/farm/farmDetail/BottomSheetHeader';
import { Icon } from '@iconify/react';

const FarmStreamingPage = () => {
    return (
        <div className="flex-1 flex flex-col items-center bg-[#E6E0D3]/50 rounded-t-[30px] py-6 px-6 w-full">

            <BottomSheetHeader
                title={'동열이네 성장일기'}
                description="하루하루, 내 농장을 체크하세요!"
            />

            <div className="w-full -mt-12">
                <div className="w-full flex justify-end text-[12px] font-medium text-[#2A160C] pb-2 border-b border-[#2A160C]/40">
                    GDD
                </div>

                <div className="w-full flex items-center justify-between py-3 border-b border-[#2A160C]/40">
                    <button>
                        <Icon
                            icon="ph:caret-left-fill"
                            className="text-[18px] text-[#2A160C]"
                        />
                    </button>

                    <span className="text-[24px] text-[#2A160C]">
                        12월
                    </span>

                    <button>
                        <Icon
                            icon="ph:caret-right-fill"
                            className="text-[18px] text-[#2A160C]"
                        />
                    </button>
                </div>

                <div className="w-full bg-white rounded-[24px] mt-4 px-5 py-8 flex flex-col items-center">

                    <div className="text-[22px] text-[#2A160C] mb-6">
                        2025.12.14
                    </div>

                    <div className="w-full h-[230px] bg-[#D9D3C3] rounded-[30px] flex items-center justify-center">
                        <Icon
                            icon="mdi:image-outline"
                            className="text-[90px] text-[#8B8880]"
                        />
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-6">

                        <div className="flex flex-col gap-4">
                            <div className="bg-[#E6E0D3] rounded-[25px] p-5 flex-1 flex flex-col justify-center text-[#2A160C]">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="font-bold text-[17px]">온도</span>
                                    <span className="text-[16px]">평균 : 24도</span>
                                </div>
                                <div className="text-[13px] text-[#2A160C]/70">
                                    최저 24도 / 최고 24도
                                </div>
                            </div>

                            <div className="bg-[#E6E0D3] rounded-[25px] p-5 flex-1 flex flex-col justify-center items-center text-center text-[#2A160C]">
                                <div className="font-bold text-[13px] leading-tight">
                                    "잎 마름병" 에 취약합니다.
                                </div>
                                <div className="text-[13px] mt-2 text-[#2A160C]/80">
                                    신뢰도 88%
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#E6E0D3] rounded-[25px] p-6 text-[#2A160C] flex flex-col">
                            <div className="font-bold mb-4 text-[18px]">
                                성장
                            </div>
                            <div className="space-y-3 text-[15px]">
                                <div>작물 높이 : +2cm</div>
                                <div>잎 갯수 +2개</div>
                                <div>열매 갯수 +3</div>
                                <div className="pt-4">GGD : +1.8</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full text-center mt-12 mb-4 text-[#8B8880] text-[13px] tracking-[0.2em] font-medium">
                    SMART FARM, SMART US.
                </div>

                <div>
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default FarmStreamingPage;