interface InviteSectionProps {
  image: string;
}

const InviteSection = ({ image }: InviteSectionProps) => {
  return (
    <div className="w-full h-[190px] flex flex-col justify-between items-center pt-4 mb-12">
      <div className="text-h-20b text-[#20110A] mb-10 text-center leading-tight">
        친구를 내 농장에 초대해보세요!!
      </div>
      <div className="w-[234px] h-[100px] flex items-center justify-center">
        <img
          src={image}
          alt="친구들"
          className="w-full h-full object-contain transform scale-110"
        />
      </div>
    </div>
  );
};

export default InviteSection;
