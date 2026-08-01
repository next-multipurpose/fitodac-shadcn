'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSoftDestructiveDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.error('Oops, there was an error processing your request.', {
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 12%, var(--background))',
            '--normal-text': 'var(--destructive-foreground)',
            '--normal-border': 'var(--destructive)'
          } as CSSProperties
        })
      }
    >
      Soft Destructive Toast
    </Button>
  )
}
