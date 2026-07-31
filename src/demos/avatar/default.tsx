import { Avatar, AvatarFallback, AvatarImage } from "@/registry/primitives/avatar";

export default function AvatarComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
