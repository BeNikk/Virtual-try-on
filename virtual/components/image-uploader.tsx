"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        setPreview(dataUrl)
        onImageUpload(dataUrl)
      }
      reader.readAsDataURL(file)
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  })

  const clearImage = () => {
    setPreview(null)
  }

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-2">
            {isDragActive ? "Drop your image here" : "Drag & drop your photo here"}
          </p>
          <p className="text-muted-foreground text-center text-sm">or click to browse files</p>
          <p className="text-muted-foreground/70 text-center text-xs mt-4">Supported formats: JPEG, PNG, WebP</p>
        </div>
      ) : (
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 rounded-full"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

