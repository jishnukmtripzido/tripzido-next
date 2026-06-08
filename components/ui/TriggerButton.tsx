'use client'

interface TriggerButtonProps {
  onClick:   () => void
  children:  React.ReactNode
  disabled?: boolean
  hasError?: boolean
  active?:   boolean
}

export default function TriggerButton({
  onClick,
  children,
  disabled = false,
  hasError = false,
  active   = false,
}: TriggerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-between border rounded-md p-3 bg-white transition-colors text-left cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
        ${hasError
          ? 'border-red-300 hover:border-red-400'
          : active
            ? 'border-[#ffc107] ring-2 ring-[#ffc107]/30'
            : 'border-gray-300 hover:border-[#ffc107]'
        }`}
    >
      <div className="flex items-center min-w-0 flex-1">{children}</div>
    </button>
  )
}
