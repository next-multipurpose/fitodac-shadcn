"use client"

import { File as FileIcon, FileSpreadsheet, X } from "lucide-react"
import { useRef, useState } from "react"
import type { ChangeEvent, DragEvent } from "react"
import { toast } from "sonner"

import { Button } from "@/registry/primitives/button"
import { Card } from "@/registry/primitives/card"
import { Progress } from "@/registry/primitives/progress"

export default function FileUploadSpreadsheetProgressDemo() {
	const [uploadState, setUploadState] = useState<{
		file: globalThis.File | null
		progress: number
		uploading: boolean
	}>({
		file: null,
		progress: 0,
		uploading: false,
	})
	const [showDummy, setShowDummy] = useState(true)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const validFileTypes = [
		"text/csv",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	]

	const handleFile = (file: globalThis.File | undefined) => {
		if (!file) return

		if (validFileTypes.includes(file.type)) {
			setUploadState({ file, progress: 0, uploading: true })

			const interval = setInterval(() => {
				setUploadState((prev) => {
					const newProgress = prev.progress + 5
					if (newProgress >= 100) {
						clearInterval(interval)
						return { ...prev, progress: 100, uploading: false }
					}
					return { ...prev, progress: newProgress }
				})
			}, 200)
		} else {
			toast.error("Please upload a CSV, XLSX, or XLS file.", {
				position: "bottom-right",
				duration: 3000,
			})
		}
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		handleFile(event.target.files?.[0])
	}

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		handleFile(event.dataTransfer.files?.[0])
	}

	const resetFile = () => {
		setUploadState({ file: null, progress: 0, uploading: false })
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	const getFileIcon = () => {
		if (!uploadState.file) return <FileIcon />

		const fileExt = uploadState.file.name.split(".").pop()?.toLowerCase() || ""
		return ["csv", "xlsx", "xls"].includes(fileExt) ? (
			<FileSpreadsheet className="size-5 text-foreground" />
		) : (
			<FileIcon className="size-5 text-foreground" />
		)
	}

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes"
		const k = 1024
		const sizes = ["Bytes", "KB", "MB", "GB"]
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
	}

	const { file, progress, uploading } = uploadState

	return (
		<form className="w-full" onSubmit={(e) => e.preventDefault()}>
			<h3 className="text-lg font-semibold text-balance text-foreground">
				File Upload
			</h3>

			<div
				className="mt-2 flex justify-center rounded-md border border-dashed border-input px-6 py-12"
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
			>
				<div>
					<FileIcon
						className="mx-auto size-12 text-muted-foreground"
						aria-hidden={true}
					/>
					<div className="flex text-sm leading-6 text-muted-foreground">
						<p>Drag and drop or</p>
						<label
							htmlFor="file-upload-03"
							className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
						>
							<span>choose file</span>
							<input
								id="file-upload-03"
								name="file-upload-03"
								type="file"
								className="sr-only"
								accept=".csv, .xlsx, .xls"
								onChange={handleFileChange}
								ref={fileInputRef}
							/>
						</label>
						<p className="pl-1 text-pretty">to upload</p>
					</div>
				</div>
			</div>

			<p className="mt-2 text-xs leading-5 text-pretty text-muted-foreground sm:flex sm:items-center sm:justify-between">
				<span>Accepted file types: CSV, XLSX or XLS files.</span>
				<span className="pl-1 sm:pl-0">Max. size: 10MB</span>
			</p>

			{!file && showDummy && (
				<Card className="relative mt-8 gap-4 bg-muted p-4 shadow-none">
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
						aria-label="Remove"
						onClick={() => setShowDummy(false)}
					>
						<X className="size-5 shrink-0" aria-hidden={true} />
					</Button>

					<div className="flex items-center space-x-2.5">
						<span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-border ring-inset">
							<FileSpreadsheet
								className="size-5 text-foreground"
								aria-hidden={true}
							/>
						</span>
						<div>
							<p className="text-xs font-medium text-pretty text-foreground">
								Revenue_Q1_2024.xlsx
							</p>
							<p className="mt-0.5 text-xs text-pretty text-muted-foreground">
								3.1 MB
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<Progress value={45} className="h-1.5" />
						<span className="text-xs text-muted-foreground">45%</span>
					</div>
				</Card>
			)}

			{file && (
				<Card className="relative mt-8 gap-4 bg-muted p-4 shadow-none">
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
						aria-label="Remove"
						onClick={resetFile}
					>
						<X className="size-5 shrink-0" aria-hidden={true} />
					</Button>

					<div className="flex items-center space-x-2.5">
						<span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-border ring-inset">
							{getFileIcon()}
						</span>
						<div>
							<p className="text-xs font-medium text-pretty text-foreground">
								{file?.name}
							</p>
							<p className="mt-0.5 text-xs text-pretty text-muted-foreground">
								{file && formatFileSize(file.size)}
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-3">
						<Progress value={progress} className="h-1.5" />
						<span className="text-xs text-muted-foreground">{progress}%</span>
					</div>
				</Card>
			)}

			<div className="mt-8 flex items-center justify-end space-x-3">
				<Button
					type="button"
					variant="outline"
					className="whitespace-nowrap"
					onClick={resetFile}
					disabled={!file}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					className="whitespace-nowrap"
					disabled={!file || uploading || progress < 100}
				>
					Upload
				</Button>
			</div>
		</form>
	)
}
