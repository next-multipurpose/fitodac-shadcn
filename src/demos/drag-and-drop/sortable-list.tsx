"use client"

import { useState } from "react"
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { Card, CardContent } from "@/registry/primitives/card"

type SortableItem = {
  id: string
  title: string
  description: string
}

const initialItems: SortableItem[] = [
  {
    id: "research",
    title: "Research",
    description: "Review requirements and references",
  },
  {
    id: "wireframes",
    title: "Wireframes",
    description: "Define layout and interaction flow",
  },
  {
    id: "implementation",
    title: "Implementation",
    description: "Build the production component",
  },
  {
    id: "review",
    title: "Review",
    description: "Validate behavior and accessibility",
  },
]

function SortableRow({ item }: { item: SortableItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={isDragging ? "relative z-10 py-0 opacity-70 shadow-lg" : "py-0"}
    >
      <CardContent className="flex items-center gap-3 p-3">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="touch-none cursor-grab active:cursor-grabbing"
          aria-label={`Drag ${item.title}`}
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon />
        </Button>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{item.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DragAndDropSortableListDemo() {
  const [items, setItems] = useState(initialItems)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id)
      const newIndex = currentItems.findIndex((item) => item.id === over.id)

      if (oldIndex === -1 || newIndex === -1) {
        return currentItems
      }

      return arrayMove(currentItems, oldIndex, newIndex)
    })
  }

  return (
    <div className="w-full max-w-md">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {items.map((item) => (
              <SortableRow key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
