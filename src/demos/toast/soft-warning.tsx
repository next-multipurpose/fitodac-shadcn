'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSoftWarningDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.warning('Warning: Please check the entered data.', {
          style: {
            '--normal-bg':
              'color-mix(in oklab, var(--warning) 12%, var(--background))',
            '--normal-text': 'var(--warning-foreground)',
            '--normal-border': 'var(--warning)'
          } as CSSProperties
        })
      }
    >
      Soft Warning Toast
    </Button>
  )
}
