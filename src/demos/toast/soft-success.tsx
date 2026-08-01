'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSoftSuccessDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.success('Action completed successfully!', {
          style: {
            '--normal-bg':
              'color-mix(in oklab, var(--success) 12%, var(--background))',
            '--normal-text': 'var(--success-foreground)',
            '--normal-border': 'var(--success)'
          } as CSSProperties
        })
      }
    >
      Soft Success Toast
    </Button>
  )
}
