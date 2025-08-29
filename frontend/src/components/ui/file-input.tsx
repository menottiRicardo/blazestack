import * as React from 'react'
import { X } from 'lucide-react'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface FileInputProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  className?: string
  disabled?: boolean
  preview?: boolean
  currentFile?: File | null
  placeholder?: string
}

export function FileInput({
  onFileSelect,
  className,
  preview = true,
  currentFile,
}: FileInputProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (currentFile && currentFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(currentFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [currentFile])

  const validateFile = (file: File): boolean => {
    setError(null)

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return false
    }

    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file)
    } else {
      onFileSelect(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    } else {
      // If no file is selected, clear the state
      onFileSelect(null)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    setError(null)
    onFileSelect(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {previewUrl && preview ? (
        <div className="w-64 h-64 relative mx-auto">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-64 h-64 rounded-lg object-cover"
          />
          <button
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation()
              handleRemove()
            }}
          >
            <X className="w-4 h-4 text-red-500 cursor-pointer" />
          </button>
        </div>
      ) : (
        <Input id="image" type="file" onChange={handleInputChange} />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
