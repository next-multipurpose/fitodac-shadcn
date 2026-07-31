import { Avatar, AvatarImage } from "@/registry/primitives/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/primitives/tooltip";

export default function AvatarComponent() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className="ring-background rounded-full ring-1">
          <AvatarImage alt="Jane Cooper" src="https://i.pravatar.cc/150?img=1" />
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>Jane Cooper</TooltipContent>
    </Tooltip>
  );
}
