import { getOffersCached } from "@/lib/cache";
import { FALLBACK_OFFERS } from "@/lib/constants";
import OffersSection from "./OffersSection";

export default async function OffersSectionData() {
  let offers = FALLBACK_OFFERS;
  try {
    const cached = await getOffersCached();
    if (cached.length > 0) offers = cached;
  } catch {
    // API down — use fallback, nothing gets cached
  }
  return <OffersSection offers={offers} />;
}
