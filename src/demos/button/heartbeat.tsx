import * as motion from "motion/react-client"

import { Button } from "@/registry/primitives/button"

export default function ButtonHeartbeatEffectDemo() {
  return (
    <Button asChild variant="destructive" className="transition-none">
      <motion.button
        animate={{ scale: [1, 1.08, 1, 1.08, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5 }}
      >
        Heartbeat Effect
      </motion.button>
    </Button>
  )
}
