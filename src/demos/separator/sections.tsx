import { Separator } from "@/registry/primitives/separator"

export default function SeparatorSectionsDemo() {
  return (
    <div className="w-full max-w-md rounded-lg border">
      <section className="space-y-1 p-4">
        <h3 className="font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your profile and personal information.
        </p>
      </section>
      <Separator />
      <section className="space-y-1 p-4">
        <h3 className="font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Choose which updates you want to receive.
        </p>
      </section>
      <Separator />
      <section className="space-y-1 p-4">
        <h3 className="font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Review passwords and active sessions.
        </p>
      </section>
    </div>
  )
}
