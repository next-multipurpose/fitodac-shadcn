'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSoftInfoDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.info('This is for your information, please note.', {
          style: {
            '--normal-bg':
              'color-mix(in oklab, var(--info) 12%, var(--background))',
            '--normal-text': 'var(--info-foreground)',
            '--normal-border': 'var(--info)'
          } as CSSProperties
        })
      }
    >
      Soft Info Toast
    </Button>
  )
}
