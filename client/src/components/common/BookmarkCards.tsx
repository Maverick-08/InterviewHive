import type { IconType } from "react-icons";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const BookmarkCards = ({
  title,
  value,
  Icon,
  cardStyle,
  iconStyle,
}: {
  title: string;
  value: string;
  Icon: IconType;
  cardStyle?: string;
  iconStyle?: string;
}) => {
  return (
    <Card
      className={cn(
        `bg-[#171717] rounded-sm text-white px-2 py-2 w-72 border border-[#333333] ${cardStyle}`
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="text-neutral-500">{title}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
        <div>
          <div className={cn(`p-2 rounded-sm ${iconStyle}`)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookmarkCards;
