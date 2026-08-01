'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSolidWarningDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.warning('Warning: Please check the entered data.', {
          style: {
            '--normal-bg': 'var(--warning)',
            '--normal-text': 'white',
            '--normal-border': 'var(--warning)'
          } as CSSProperties
        })
      }
    >
      Solid Warning Toast
    </Button>
  )
}
