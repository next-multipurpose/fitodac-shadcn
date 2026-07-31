import { Button } from "@/registry/primitives/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/primitives/drawer"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function DrawerLoginFormDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Login</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="font-normal">Login</DrawerTitle>
            <DrawerDescription>
              Please login again to continue using the application.
            </DrawerDescription>
          </DrawerHeader>
          <form id="drawer-login-form" className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                autoComplete="username"
                placeholder="hello@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                type="password"
                placeholder="••••••••••"
                autoComplete="current-password"
              />
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" form="drawer-login-form">Login</Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
