import { getAnnouncementBannerCached } from "@/lib/cache";
import AnnouncementBanner from "@/components/ui/AnnouncementBanner";
import type { AnnouncementBannerPage } from "@/types/search.types";

interface Props {
  page: AnnouncementBannerPage;
}

export default async function AnnouncementBannerData({ page }: Props) {
  let banner = null;
  try {
    banner = await getAnnouncementBannerCached(page);
  } catch {
    // no banner — render nothing
  }

  if (!banner) return null;
  return <AnnouncementBanner content={banner.content} />;
}
