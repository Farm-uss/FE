interface Friend {
  id: number;
  name: string;
  color: string;
}

interface FriendItemProps {
  friend: Friend;
  onRemove?: (id: number) => void;
}

const FriendItem = ({ friend, onRemove }: FriendItemProps) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div
        className={`w-24 h-24 rounded-full flex-none ${friend.color} border-2 border-white/20 shadow-sm`}
      />
      <div className="flex-1 bg-[#E8E2D5] rounded-2xl h-20 flex items-center justify-between pl-3 pr-4 shadow-sm min-w-0">
        <div className="flex-1 flex justify-center min-w-0 mr-2">
          <div className="w-[180px] bg-white py-2 rounded-full border border-[#D9D9D9]/50 flex justify-center items-center overflow-hidden">
            <span className="text-[#20110A] text-b-16b truncate px-2">
              {friend.name}
            </span>
          </div>
        </div>
        <div className="flex-none">
          <button
            onClick={() => onRemove?.(friend.id)}
            className="bg-[#20110A] text-white text-c-12b px-5 py-2.5 rounded-full h-12 active:scale-95 transition-transform"
          >
            내보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
