"use client"

import { useEffect, useMemo, useState } from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  CircleAlertIcon,
  CloudUploadIcon,
  GripVerticalIcon,
  XIcon,
} from "lucide-react"
import { toast } from "sonner"

import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { Card, CardContent } from "@/registry/primitives/card"
import { cn } from "@/lib/utils"

const initialImages: FileMetadata[] = [
  { id: "product-1", name: "Product view 1", size: 180000, type: "image/jpeg", url: "https://picsum.photos/1000/800?grayscale&random=6" },
  { id: "product-2", name: "Product view 2", size: 190000, type: "image/jpeg", url: "https://picsum.photos/1000/800?grayscale&random=7" },
  { id: "product-3", name: "Product view 3", size: 175000, type: "image/jpeg", url: "https://picsum.photos/1000/800?grayscale&random=8" },
  { id: "product-4", name: "Product view 4", size: 205000, type: "image/jpeg", url: "https://picsum.photos/1000/800?grayscale&random=9" },
]

function SortableImage({ item, onRemove }: { item: FileWithPreview; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("group relative overflow-hidden py-0", isDragging && "z-10 opacity-70 shadow-lg")}
    >
      <CardContent className="relative aspect-square p-0">
        {item.preview ? (
          <img src={item.preview} alt={item.file.name} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
            {item.file.name}
          </div>
        )}
        <div className="absolute inset-x-2 top-2 flex justify-between">
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="touch-none cursor-grab active:cursor-grabbing"
            aria-label={`Drag ${item.file.name}`}
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label={`Remove ${item.file.name}`}
            onClick={() => onRemove(item.id)}
          >
            <XIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FileUploadSortableGalleryDemo() {
  const [
    { files, isDragging, errors },
    { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    accept: "image/*",
    multiple: true,
    initialFiles: initialImages,
  })

  const [order, setOrder] = useState(() => initialImages.map((item) => item.id))

  useEffect(() => {
    setOrder((current) => {
      const available = new Set(files.map((file) => file.id))
      const retained = current.filter((id) => available.has(id))
      const added = files.map((file) => file.id).filter((id) => !retained.includes(id))
      return [...retained, ...added]
    })
  }, [files])

  const orderedFiles = useMemo(() => {
    const byId = new Map(files.map((file) => [file.id, file]))
    return order.map((id) => byId.get(id)).filter((file): file is FileWithPreview => Boolean(file))
  }, [files, order])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setOrder((current) => {
      const oldIndex = current.indexOf(String(active.id))
      const newIndex = current.indexOf(String(over.id))
      if (oldIndex === -1 || newIndex === -1) return current
      const next = arrayMove(current, oldIndex, newIndex)
      toast.success("Images reordered")
      return next
    })
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div
        className={cn(
          "rounded-lg border border-dashed p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />
        <CloudUploadIcon className="mx-auto mb-3 size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Upload up to 5 images, then drag them to reorder.
        </p>
        <Button type="button" className="mt-4" onClick={openFileDialog}>
          Add images
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Images up to {formatBytes(10 * 1024 * 1024)} each.
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedFiles.map((item) => item.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {orderedFiles.map((item) => (
              <SortableImage key={item.id} item={item} onRemove={removeFile} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>File upload error</AlertTitle>
          <AlertDescription>
            {errors.map((error) => <p key={error}>{error}</p>)}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
