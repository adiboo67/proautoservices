import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-toastify'

interface PhotoUploadProps {
  imageUrl?: string
  onUpload: (url: string) => void
  onDelete?: () => void
  index: number
}

export default function PhotoUpload({ imageUrl, onUpload, onDelete, index }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (imageUrl) {
      setPreview(null)
    }
  }, [imageUrl])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Veuillez sélectionner une image')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
      
      // Vérifier l'extension du fichier
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
      if (!allowedExtensions.includes(fileExt)) {
        throw new Error('Format de fichier non supporté. Utilisez JPG, PNG ou GIF')
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('La taille du fichier ne doit pas dépasser 5MB')
      }

      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`

      // Create a local preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase
      const { error: uploadError, data } = await supabase.storage
        .from('vehicle-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`
        })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        throw new Error(uploadError.message)
      }

      if (data?.path) {
        const { data: urlData } = supabase.storage
          .from('vehicle-photos')
          .getPublicUrl(fileName)

        if (urlData?.publicUrl) {
          onUpload(urlData.publicUrl)
        } else {
          throw new Error('Erreur lors de la récupération de l\'URL publique')
        }
      } else {
        throw new Error('Erreur lors du téléchargement du fichier')
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Erreur lors du téléchargement')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (onDelete) {
      try {
        if (imageUrl) {
          const fileName = imageUrl.split('/').pop()
          if (fileName) {
            const { error } = await supabase.storage
              .from('vehicle-photos')
              .remove([fileName])
            
            if (error) {
              console.error('Error deleting file:', error)
              throw new Error('Erreur lors de la suppression du fichier')
            }
          }
        }
        setPreview(null)
        onDelete()
      } catch (error: any) {
        console.error('Error in handleDelete:', error)
        toast.error(error.message || 'Erreur lors de la suppression de l\'image')
      }
    }
  }

  const displayUrl = imageUrl || preview

  return (
    <div className="relative w-full h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
      {displayUrl ? (
        <>
          <Image
            src={displayUrl}
            alt={`Photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 rounded-lg"
            unoptimized={preview !== null}
            priority={index === 0}
          />
          <button
            onClick={handleDelete}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
            type="button"
            title="Supprimer la photo"
          >
            ×
          </button>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm text-gray-500">Photo {index + 1}</p>
            {uploading && (
              <div className="mt-2 text-sm text-blue-500">Chargement...</div>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  )
}
