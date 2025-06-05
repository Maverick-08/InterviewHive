import { cn } from "@/lib/utils";

const Card = ({
  componentStyle,
  children,
}: {
  componentStyle?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `w-full h-full px-8 bg-slate-800 rounded-md font-mono text-white ${componentStyle}`
      )}
    >
      {children}
    </div>
  );
};

export default Card;
