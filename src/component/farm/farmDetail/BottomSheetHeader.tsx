interface BottomSheetHeaderProps {
  title: string;
  description?: string;
}

const BottomSheetHeader = ({ title, description }: BottomSheetHeaderProps) => {
  return (
    <div className="shrink-0">
      <div className="w-12 h-1 bg-[#8B8880]/40 rounded-full mx-auto mb-4" />

      <div className="text-center mb-6">
        <h2 className="text-b-16b text-[#20110A]">{title}</h2>
        {description && (
          <p className="text-c-10m text-[#20110A]/60 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default BottomSheetHeader;
