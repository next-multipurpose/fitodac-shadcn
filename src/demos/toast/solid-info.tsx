'use client'

import type { CSSProperties } from 'react'
import { toast } from 'sonner'

import { Button } from '@/registry/primitives/button'

export default function ToastSolidInfoDemo() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.info('This is for your information, please note.', {
          style: {
            '--normal-bg': 'var(--info)',
            '--normal-text': 'white',
            '--normal-border': 'var(--info)'
          } as CSSProperties
        })
      }
    >
      Solid Info Toast
    </Button>
  )
}
