import { Avatar, AvatarImage } from "@/registry/primitives/avatar"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerAvatarOverlayDemo() {
  return (
    <Avatar className="relative size-10">
      <AvatarImage alt="Tobias Whetton" src="https://i.pravatar.cc/150?img=3" />
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/20 p-1">
        <Spinner className="size-6 text-white" />
      </div>
    </Avatar>
  )
}
