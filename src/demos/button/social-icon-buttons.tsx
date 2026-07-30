import { Button } from "@/registry/primitives/button"

const GoogleMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M21.6 12.23c0-.71-.06-1.23-.2-1.77H12v3.4h5.52a4.7 4.7 0 0 1-2.05 3.09l-.02.11 2.98 2.3.21.02c1.95-1.8 3.07-4.45 3.07-7.65Z" />
    <path d="M12 22c2.7 0 4.96-.89 6.61-2.42l-3.17-2.45c-.85.58-1.99.98-3.44.98-2.6 0-4.81-1.76-5.6-4.19l-.1.01-3.1 2.4-.04.1A9.99 9.99 0 0 0 12 22Z" />
    <path d="M6.4 13.92A6.1 6.1 0 0 1 6.08 12c0-.67.12-1.32.31-1.92l-.01-.13-3.14-2.44-.1.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.48l3.35-2.56Z" />
    <path d="M12 5.89c1.88 0 3.15.81 3.88 1.48l2.8-2.73C16.96 3.04 14.7 2 12 2a9.99 9.99 0 0 0-8.85 5.52l3.24 2.56C7.2 7.65 9.4 5.89 12 5.89Z" />
  </svg>
)

const FacebookMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.55-1.46H16.7V5a22 22 0 0 0-2.4-.12c-2.38 0-4 1.45-4 4.11V11H7.6v3h2.7v8h3.2Z" />
  </svg>
)

const XMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.49 22H3.38l7.24-8.28L2.97 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.43 4.05H6.58L17.8 19.84Z" />
  </svg>
)

const GithubMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
)

export default function Component() {
  return (
    <div className="inline-flex flex-wrap gap-2">
      <Button aria-label="Login with Google" size="icon" variant="outline"><GoogleMark /></Button>
      <Button aria-label="Login with Facebook" size="icon" variant="outline"><FacebookMark /></Button>
      <Button aria-label="Login with X" size="icon" variant="outline"><XMark /></Button>
      <Button aria-label="Login with GitHub" size="icon" variant="outline"><GithubMark /></Button>
    </div>
  )
}
