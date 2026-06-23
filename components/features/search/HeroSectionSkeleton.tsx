/**
 * Skeleton for HeroSection.
 * Matches the exact same height constraints as the real hero so
 * there is zero layout shift when the image loads in.
 */
export default function HeroSectionSkeleton() {
  return (
    <div className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[42vh] md:min-h-[270px] md:max-h-none bg-gray-200 animate-pulse">
      {/* Diagonal shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
    </div>
  );
}
