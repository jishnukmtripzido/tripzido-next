import Link from "next/link";
import BackButton from "./BreadcrumbsBackButton";

interface Props {
  locationName: string;
  vehicleName: string;
}

export default function Breadcrumbs({ locationName, vehicleName }: Props) {
  return (
    <div className="text-sm text-font-dim hidden md:flex items-center gap-2">
      <Link href="/" className="hover:text-font-main-sub transition-colors">
        Home
      </Link>
      <span>›</span>
      <BackButton label={`Rentals in ${locationName}`} />
      <span>›</span>
      <span className="text-font-main-sub font-semibold">{vehicleName}</span>
    </div>
  );
}
