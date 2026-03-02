export const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex-1 bg-white rounded-[20px] p-4 flex flex-col items-center justify-center gap-2 shadow-sm h-[88px]">
    <span className="text-c-12b text-[#20110A]/60 whitespace-nowrap">
      {label}
    </span>
    <span className="text-b-16b text-[#20110A]">{value}</span>
  </div>
);
