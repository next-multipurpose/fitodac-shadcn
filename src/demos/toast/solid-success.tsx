'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSolidSuccessDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.success('Action completed successfully!', {
          style: {
            '--normal-bg': 'var(--success)',
            '--normal-text': 'white',
            '--normal-border': 'var(--success)'
          } as CSSProperties
        })
      }
    >
      Solid Success Toast
    </Button>
  )
}
