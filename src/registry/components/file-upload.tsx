"use client"

import * as React from "react"

import {
  formatBytes,
  useFileUpload,
  type FileUploadActions,
  type FileUploadOptions,
  type FileUploadState,
  type FileWithPreview,
} from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"

type FileUploadContextValue = {
  state: FileUploadState
  actions: FileUploadActions
  disabled: boolean
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null
)

function useFileUploadContext() {
  const context = React.useContext(FileUploadContext)

  if (!context) {
    throw new Error(
      "File upload components must be rendered inside <FileUpload>."
    )
  }

  return context
}

type FileUploadProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "onError"
> &
  FileUploadOptions & {
    disabled?: boolean
  }

function FileUpload({
  accept,
  initialFiles,
  maxFiles,
  maxSize,
  multiple,
  onError,
  onFilesAdded,
  onFilesChange,
  disabled = false,
  className,
  children,
  ...props
}: FileUploadProps) {
  const [state, actions] = useFileUpload({
    accept,
    initialFiles,
    maxFiles,
    maxSize,
    multiple,
    onError,
    onFilesAdded,
    onFilesChange,
  })

  const value = React.useMemo(
    () => ({ state, actions, disabled }),
    [state, actions, disabled]
  )

  return (
    <FileUploadContext.Provider value={value}>
      <div
        data-slot="file-upload"
        data-disabled={disabled || undefined}
        className={cn("w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {children}
      </div>
    </FileUploadContext.Provider>
  )
}

type FileUploadDropzoneProps = React.ComponentProps<"div"> & {
  openOnClick?: boolean
}

function FileUploadDropzone({
  className,
  openOnClick = true,
  onClick,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onKeyDown,
  role,
  tabIndex,
  ...props
}: FileUploadDropzoneProps) {
  const { state, actions, disabled } = useFileUploadContext()

  return (
    <div
      data-slot="file-upload-dropzone"
      data-dragging={state.isDragging || undefined}
      data-disabled={disabled || undefined}
      role={role ?? (openOnClick ? "button" : undefined)}
      tabIndex={tabIndex ?? (openOnClick && !disabled ? 0 : undefined)}
      className={cn(
        "rounded-lg border border-dashed border-input p-6 transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        state.isDragging && "border-primary bg-primary/5",
        openOnClick && !disabled && "cursor-pointer",
        disabled && "pointer-events-none cursor-not-allowed",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || disabled || !openOnClick) return

        const target = event.target as HTMLElement
        if (
          target.closest(
            '[data-slot="file-upload-trigger"], input[type="file"]'
          )
        ) {
          return
        }

        actions.openFileDialog()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || disabled || !openOnClick) return

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          actions.openFileDialog()
        }
      }}
      onDragEnter={(event) => {
        onDragEnter?.(event)
        if (!event.defaultPrevented && !disabled) {
          actions.handleDragEnter(event)
        }
      }}
      onDragLeave={(event) => {
        onDragLeave?.(event)
        if (!event.defaultPrevented && !disabled) {
          actions.handleDragLeave(event)
        }
      }}
      onDragOver={(event) => {
        onDragOver?.(event)
        if (!event.defaultPrevented && !disabled) {
          actions.handleDragOver(event)
        }
      }}
      onDrop={(event) => {
        onDrop?.(event)
        if (!event.defaultPrevented && !disabled) {
          actions.handleDrop(event)
        }
      }}
      {...props}
    />
  )
}

function FileUploadInput({
  className,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  const { actions, disabled: rootDisabled } = useFileUploadContext()
  const inputProps = actions.getInputProps({
    ...props,
    disabled: rootDisabled || Boolean(disabled),
  })

  return (
    <input
      {...inputProps}
      data-slot="file-upload-input"
      className={cn("sr-only", className)}
    />
  )
}

function FileUploadTrigger({
  className,
  type = "button",
  disabled,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { actions, disabled: rootDisabled } = useFileUploadContext()
  const isDisabled = rootDisabled || Boolean(disabled)

  return (
    <button
      data-slot="file-upload-trigger"
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !isDisabled) {
          event.stopPropagation()
          actions.openFileDialog()
        }
      }}
      {...props}
    />
  )
}

function FileUploadClear({
  className,
  type = "button",
  disabled,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { state, actions, disabled: rootDisabled } = useFileUploadContext()
  const isDisabled =
    rootDisabled || Boolean(disabled) || state.files.length === 0

  return (
    <button
      data-slot="file-upload-clear"
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !isDisabled) {
          actions.clearFiles()
        }
      }}
      {...props}
    />
  )
}

type FileUploadListProps = Omit<React.ComponentProps<"ul">, "children"> & {
  children:
    | React.ReactNode
    | ((file: FileWithPreview, index: number) => React.ReactNode)
  empty?: React.ReactNode
}

function FileUploadList({
  className,
  children,
  empty = null,
  ...props
}: FileUploadListProps) {
  const { state } = useFileUploadContext()

  if (state.files.length === 0) {
    return <>{empty}</>
  }

  return (
    <ul
      data-slot="file-upload-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {typeof children === "function"
        ? state.files.map((file, index) => children(file, index))
        : children}
    </ul>
  )
}

type FileUploadItemContextValue = {
  item: FileWithPreview
  remove: () => void
}

const FileUploadItemContext =
  React.createContext<FileUploadItemContextValue | null>(null)

function useFileUploadItemContext() {
  const context = React.useContext(FileUploadItemContext)

  if (!context) {
    throw new Error(
      "File upload item components must be rendered inside <FileUploadItem>."
    )
  }

  return context
}

type FileUploadItemProps = React.ComponentProps<"li"> & {
  value: string
}

function FileUploadItem({
  value,
  className,
  children,
  ...props
}: FileUploadItemProps) {
  const { state, actions } = useFileUploadContext()
  const item = state.files.find((candidate) => candidate.id === value)

  if (!item) return null

  return (
    <FileUploadItemContext.Provider
      value={{ item, remove: () => actions.removeFile(item.id) }}
    >
      <li
        data-slot="file-upload-item"
        data-value={item.id}
        className={cn(
          "flex items-center gap-3 rounded-md border border-border p-3",
          className
        )}
        {...props}
      >
        {children}
      </li>
    </FileUploadItemContext.Provider>
  )
}

type FileUploadItemPreviewProps = Omit<
  React.ComponentProps<"img">,
  "src" | "alt"
> & {
  fallback?: React.ReactNode
}

function FileUploadItemPreview({
  className,
  fallback = null,
  ...props
}: FileUploadItemPreviewProps) {
  const { item } = useFileUploadItemContext()

  if (!item.preview) {
    return <>{fallback}</>
  }

  return (
    <img
      data-slot="file-upload-item-preview"
      src={item.preview}
      alt={item.file.name}
      className={cn("size-10 rounded-md object-cover", className)}
      {...props}
    />
  )
}

function FileUploadItemName({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { item } = useFileUploadItemContext()

  return (
    <span
      data-slot="file-upload-item-name"
      className={cn("min-w-0 flex-1 truncate text-sm font-medium", className)}
      {...props}
    >
      {item.file.name}
    </span>
  )
}

function FileUploadItemSize({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { item } = useFileUploadItemContext()

  return (
    <span
      data-slot="file-upload-item-size"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {formatBytes(item.file.size)}
    </span>
  )
}

function FileUploadItemDelete({
  className,
  type = "button",
  disabled,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { remove } = useFileUploadItemContext()
  const { disabled: rootDisabled } = useFileUploadContext()
  const isDisabled = rootDisabled || Boolean(disabled)

  return (
    <button
      data-slot="file-upload-item-delete"
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !isDisabled) {
          remove()
        }
      }}
      {...props}
    />
  )
}

function FileUploadErrors({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { state } = useFileUploadContext()

  if (state.errors.length === 0) return null

  return (
    <div
      data-slot="file-upload-errors"
      role="alert"
      className={cn("space-y-1 text-sm text-destructive", className)}
      {...props}
    >
      {children ??
        state.errors.map((error) => <p key={error}>{error}</p>)}
    </div>
  )
}

export {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadErrors,
  FileUploadInput,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemSize,
  FileUploadList,
  FileUploadTrigger,
  useFileUploadContext,
  useFileUploadItemContext,
}
export type {
  FileUploadContextValue,
  FileUploadDropzoneProps,
  FileUploadItemProps,
  FileUploadListProps,
  FileUploadProps,
}
