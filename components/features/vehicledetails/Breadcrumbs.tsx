import Link from "next/link";

export default function Breadcrumbs() {
  return (
    <div className="text-sm text-gray-500 flex items-center gap-2">
      <Link href="/" className="hover:text-gray-900 transition-colors">
        Home
      </Link>
      <span>›</span>
      <Link
        href="/rentals/goa"
        className="hover:text-gray-900 transition-colors"
      >
        Rentals in Goa
      </Link>
      <span>›</span>
      <span className="text-gray-900 font-medium">Yamaha Fascino</span>
    </div>
  );
}
