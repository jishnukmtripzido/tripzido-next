// components/ui/FieldError.tsx
export function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
      <div className="absolute left-0 top-full mt-1.5 z-50">
        <div className="relative bg-red-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md whitespace-nowrap">
          {/* Arrow pointing up */}
          <span className="absolute -top-1 left-3 w-2 h-2 bg-red-600 rotate-45" />
          {message}
        </div>
      </div>
    );
  }