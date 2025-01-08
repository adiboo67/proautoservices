import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import toast from 'react-hot-toast'

interface SignaturePadProps {
  onSave?: (signature: string | null) => void
  existingSignature?: string | null
}

export default function SignaturePad({ onSave = () => {}, existingSignature }: SignaturePadProps) {
  const sigPad = useRef<any>(null)
  const [showExisting, setShowExisting] = useState(!!existingSignature)

  const clear = () => {
    sigPad.current?.clear()
  }

  const save = () => {
    if (sigPad.current?.isEmpty()) {
      toast.error('Veuillez signer avant de sauvegarder')
      return
    }

    const signature = sigPad.current?.toDataURL()
    if (signature && onSave) {
      onSave(signature)
      toast.success('Signature enregistrée')
    }
  }

  return (
    <div className="space-y-4">
      {showExisting && existingSignature ? (
        <div className="space-y-2">
          <img
            src={existingSignature}
            alt="Signature existante"
            className="border rounded-lg p-2 bg-white"
          />
          <button
            onClick={() => setShowExisting(false)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Modifier la signature
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="border rounded-lg bg-white">
            <SignatureCanvas
              ref={sigPad}
              canvasProps={{
                className: 'signature-canvas w-full h-40',
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={clear}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Effacer
            </button>
            <button
              onClick={save}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
