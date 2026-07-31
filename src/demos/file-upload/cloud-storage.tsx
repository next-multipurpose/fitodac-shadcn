"use client"

import { FileIcon, TrashIcon } from "lucide-react"

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/registry/primitives/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/primitives/card"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"
import { Separator } from "@/registry/primitives/separator"
import { cn } from "@/lib/utils"

export default function FileUploadCloudStorageDemo() {
  const [
    { files, isDragging },
    { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024,
    multiple: true,
  })

  return (
    <Card className="shadow-none sm:mx-auto sm:max-w-xl">
      <CardHeader>
        <CardTitle>Set up your first cloud storage</CardTitle>
        <CardDescription>Configure a bucket and add the files you want to upload.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="grid grid-cols-1 gap-4 sm:grid-cols-6"
        >
          <div className="col-span-full sm:col-span-3">
            <Label htmlFor="bucket-name">Bucket name</Label>
            <Input id="bucket-name" name="bucket-name" placeholder="Bucket name" className="mt-2" />
          </div>

          <div className="col-span-full sm:col-span-3">
            <Label htmlFor="visibility">Visibility</Label>
            <Select defaultValue="private" disabled>
              <SelectTrigger id="visibility" className="mt-2 w-full">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-2 text-sm text-muted-foreground">Only admins can change visibility.</p>
          </div>

          <div className="col-span-full">
            <Label htmlFor="cloud-storage-files">File(s) upload</Label>
            <div
              className={cn(
                "mt-2 flex cursor-pointer justify-center rounded-md border border-dashed px-6 py-16 text-center transition-colors",
                isDragging ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border"
              )}
              onClick={openFileDialog}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                {...getInputProps({ id: "cloud-storage-files", name: "cloud-storage-files" })}
                className="sr-only"
              />
              <div>
                <FileIcon className="mx-auto size-12 text-muted-foreground/80" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Drag and drop or choose files to upload
                </p>
              </div>
            </div>
            <p className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>All file types are allowed.</span>
              <span>Max. size per file: 50 MB</span>
            </p>
          </div>

          {files.length > 0 && (
            <div className="col-span-full space-y-3">
              <Separator />
              <h4 className="font-medium">File(s) to upload</h4>
              <ul className="space-y-2">
                {files.map((item) => (
                  <li key={item.id}>
                    <Card className="py-0 shadow-none">
                      <CardContent className="flex items-center gap-3 p-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                          <FileIcon className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{item.file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatBytes(item.file.size)}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${item.file.name}`}
                          onClick={() => removeFile(item.id)}
                        >
                          <TrashIcon />
                        </Button>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="col-span-full flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Create storage</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
