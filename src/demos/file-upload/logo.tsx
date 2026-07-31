"use client"

import {
	formatBytes,
	useFileUpload,
	type FileWithPreview,
} from "@/hooks/use-file-upload"
import { Alert, AlertDescription, AlertTitle } from "@/registry/primitives/alert"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/primitives/button"
import { CircleAlertIcon, UserIcon, XIcon, Image } from "lucide-react"

interface AvatarUploadProps {
	maxSize?: number
	className?: string
	onFileChange?: (file: FileWithPreview | null) => void
	defaultAvatar?: string
}

export default function FileUploadLogoDemo({
	maxSize = 2 * 1024 * 1024, // 2MB
	className,
	onFileChange,
	defaultAvatar,
}: AvatarUploadProps) {
	const [
		{ files, isDragging, errors },
		{
			removeFile,
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			getInputProps,
		},
	] = useFileUpload({
		maxFiles: 1,
		maxSize,
		accept: "image/*",
		multiple: false,
		onFilesChange: (files) => {
			onFileChange?.(files[0] || null)
		},
	})

	const currentFile = files[0]
	const previewUrl = currentFile?.preview || defaultAvatar

	const handleRemove = () => {
		if (currentFile) {
			removeFile(currentFile.id)
		}
	}

	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			{/* Image Preview */}
			<div className="relative">
				<div
					className={cn(
						"relative flex h-24 w-80 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-ring p-2.5 transition-colors",
						isDragging
							? "border-primary bg-primary/5"
							: "border-muted-foreground/25 hover:border-muted-foreground/20",
						previewUrl && "border-solid"
					)}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onClick={openFileDialog}
				>
					<input {...getInputProps()} className="sr-only" />

					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Avatar"
							className="size-auto max-h-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center opacity-50">
							<Image className="size-8 text-muted-foreground" />
						</div>
					)}
				</div>

				{/* Remove Button - only show when file is uploaded */}
				{currentFile && (
					<Button
						size="icon"
						variant="outline"
						onClick={handleRemove}
						className="absolute end-0.5 top-0.5 z-10 size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700"
						aria-label="Remove avatar"
					>
						<XIcon className="size-3.5" />
					</Button>
				)}
			</div>

			{/* Upload Instructions */}
			<div className="w-full space-y-0.5 px-3">
				<p className="text-sm font-medium">
					{currentFile ? "Logo uploaded" : "Upload logo"}
				</p>
				<p className="text-xs text-muted-foreground">
					PNG, WEBP, SVG up to {formatBytes(maxSize)}
				</p>
			</div>

			{/* Error Messages */}
			{errors.length > 0 && (
				<Alert variant="destructive" className="mt-5">
					<CircleAlertIcon />
					<AlertTitle>File upload error(s)</AlertTitle>
					<AlertDescription>
						{errors.map((error, index) => (
							<p key={index} className="last:mb-0">
								{error}
							</p>
						))}
					</AlertDescription>
				</Alert>
			)}
		</div>
	)
}
