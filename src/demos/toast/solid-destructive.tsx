'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSolidDestructiveDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.error('Oops, there was an error processing your request.', {
          style: {
            '--normal-bg':
              'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
            '--normal-text': 'white',
            '--normal-border': 'transparent'
          } as CSSProperties
        })
      }
    >
      Solid Destructive Toast
    </Button>
  )
}
