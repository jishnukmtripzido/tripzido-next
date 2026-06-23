import { getOffersApi } from "@/services/vehicle.service";
import { FALLBACK_OFFERS } from "@/lib/constants";
import OffersSection from "./OffersSection";

/**
 * Async Server Component — awaits the offers API then hands resolved
 * data to the client OffersSection carousel.  Lives behind a <Suspense>
 * boundary in page.tsx so the rest of the page is never blocked.
 * Falls back to hardcoded data if the API errors or returns nothing.
 */
export default async function OffersSectionData() {
  let offers = FALLBACK_OFFERS;

  try {
    const apiOffers = await getOffersApi();
    if (apiOffers && apiOffers.length > 0) {
      offers = apiOffers;
    }
  } catch {
    // API unavailable — silently use fallbacks
  }

  return <OffersSection offers={offers} />;
}
