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
    return null; // ← return null explicitly on error
  }

  if (!banner?.content) return null; // ← guard against null banner or empty content
  return <AnnouncementBanner content={banner.content} />;
}
