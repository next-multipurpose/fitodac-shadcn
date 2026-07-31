import { Button } from "@/registry/primitives/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/primitives/card"

export default function CardUpgradeProDemo() {
	return (
		<Card className="w-full max-w-xs shadow-none">
			<CardHeader>
				<CardTitle>Upgrade to Pro</CardTitle>
				<CardDescription>
					Unlock advanced automation, analytics, and priority support designed
					for SaaS teams to scale faster, optimize operations, and deliver a
					world-class experience to your users.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button className="w-full">Start Free Trial</Button>
			</CardFooter>
		</Card>
	)
}
