import { Avatar, AvatarFallback, AvatarImage } from "@/registry/primitives/avatar";

export default function AvatarComponent() {
  return (
    <Avatar className="rounded-lg">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>TB</AvatarFallback>
    </Avatar>
  );
}
