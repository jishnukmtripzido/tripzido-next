import Link from "next/link";

interface Props {
  locationName: string;
  vehicleName: string;
}

export default function Breadcrumbs({ locationName, vehicleName }: Props) {
  return (
    <>
      <div className="text-sm text-gray-500 hidden md:flex items-center gap-2 ">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link
          href="/searchresult"
          className="hover:text-gray-900 transition-colors"
        >
          Rentals in {locationName}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-semibold">{vehicleName}</span>
      </div>
      <div className="md:hidden">
        <Link
          href="/"
          className="text-blue-500 hover:underline text-sm transition-colors"
        >
          Back to search result
        </Link>
      </div>
    </>
  );
}
