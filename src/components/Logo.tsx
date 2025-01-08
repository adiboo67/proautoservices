import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex justify-center items-center p-4">
      <img
        src="/images/mechanic-logo.png"
        alt="ProAutoServices Mascot"
        className="w-48 h-48 object-contain"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}
