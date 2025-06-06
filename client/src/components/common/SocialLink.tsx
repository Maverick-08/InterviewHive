import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface SocialLinkProp
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className: string;
  link: string;
  linkName: string;
  Icon: IconType;
  iconStyle?: string;
  linkStyle?: string;
}

const SocialLink = ({
  className,
  iconStyle,
  Icon,
  link,
  linkName,
  linkStyle,
  ...rest
}: SocialLinkProp) => {
  return (
    <div {...rest} className={cn(`${className}`)}>
      <a target="_blank" rel="noopener noreferrer" href={`${link}`}>
        <Icon className={cn(`h-4 w-4 ${iconStyle}`)} />
      </a>
      <span className={`${linkStyle}`}>{linkName}</span>
    </div>
  );
};

export default SocialLink;
